/*
 JSON-to-Go
 by LFZJun
 https://github.com/LFZJun/jsonToGo
 */

function jsonToGo(json, typename, options) {
    const
        GoInt = 'int',
        GoInt64 = 'int64',
        GoFloat64 = 'float64',
        GoSlice = 'slice',
        GoStruct = 'struct',
        GoString = 'string',
        GoBool = 'bool',
        GoTime = 'time.Time',
        GoInterface = 'interface{}';

    function goType(val) {
        if (val === null) {
            return GoInterface;
        } else if (Array.isArray(val)) {
            return GoSlice;
        }

        switch (typeof val) {
            case 'string':
                if (/\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(\+\d\d:\d\d|Z)/.test(val))
                    return GoTime;
                else
                    return GoString;
            case 'number':
                if (val % 1 === 0) {
                    if (val > -2147483648 && val < 2147483647)
                        return GoInt;
                    else
                        return GoInt64;
                }
                else
                    return GoFloat64;
            case 'boolean':
                return GoBool;
            case 'object':
                return GoStruct;
            default:
                return GoInterface;
        }
    }

    function goSliceType(array) {
        let sliceType = null;
        for (let ele of array) {
            let thisType = goType(ele);
            if (sliceType === null)
                sliceType = thisType;
            else if (sliceType !== thisType) {
                sliceType = mostSpecificPossibleGoType(thisType, sliceType);
                if (sliceType === GoInterface)
                    break;
            }
        }
        return sliceType
    }

    let data;
    let scope;
    let go = '';
    let tabs = 0;

    try {
        data = JSON.parse(json.replace(/\.0/g, '.1')); // hack that forces floats to stay as floats
        scope = data;
    }
    catch (e) {
        return {
            go: '',
            error: e.message
        };
    }

    typename = format(typename || 'AutoGenerated');
    append('type ' + typename + ' ');

    parseScope(scope);

    return {go: go};

    function parseScope(scope) {
        let type = goType(scope);
        switch (type) {
            case GoSlice:
                parseSlice(scope);
                break;
            case GoStruct:
                parseStruct(scope);
                break;
            default:
                append(type)
        }
    }

    function parseSlice(array) {
        let sliceLength = array.length;

        append('[]');

        switch (sliceLength) {
            case 0:
                parseScope(null);
                return;
            case 1:
                parseScope(array[0]);
                return;
            default:
        }

        let sliceType = goSliceType(array);

        switch (sliceType) {
            case GoStruct:
                let StructFields = {};
                for (let ele of array) {
                    let keys = Object.keys(ele);
                    for (let keyName of keys) {
                        if (!StructFields.hasOwnProperty(keyName)) {
                            StructFields[keyName] = {
                                count: 0,
                                fieldTypeMap: {}
                            }
                        }
                        let value = ele[keyName];
                        StructFields[keyName].fieldTypeMap[goType(value)] = value;
                        StructFields[keyName].count++;
                    }
                }

                let structFieldNames = Object.keys(StructFields), struct = {}, omitempty = {};
                for (let fieldName of structFieldNames) {
                    let elem = StructFields[fieldName];
                    let fieldTypeMapNames = Object.keys(elem.fieldTypeMap);
                    switch (fieldTypeMapNames.length) {
                        case 1:
                            let v = elem.fieldTypeMap[fieldTypeMapNames[0]];
                            struct[fieldName] = v;
                            break;
                        default:
                            struct[fieldName] = null
                    }
                    omitempty[fieldName] = elem.count !== sliceLength;
                }

                parseStruct(struct, omitempty);
                break;
            case GoSlice:
                let flatten = [];
                for (let slice of array) {
                    flatten = flatten.concat(slice);
                }
                parseSlice(flatten);
                return;
            default:
                append(sliceType || GoInterface);
        }
    }

    function parseStruct(object, omitempty) {
        append('struct {\n');
        ++tabs;
        let keys = Object.keys(object);
        for (let i in keys) {
            if (keys.hasOwnProperty(i)) {
                let keyName = keys[i];
                indent(tabs);
                append(format(keyName) + ' ');
                parseScope(object[keyName]);

                let tags = ' `json:"' + keyName;
                if (options.hasOwnProperty('hasDB')) {
                    if (options.hasDB === true) {
                        tags = ' `db:"' + camelToSnake(keyName) + '" json:"' + keyName;
                    }
                }
                append(tags);
                if (omitempty && omitempty[keyName] === true) {
                    append(',omitempty');
                }
                append('"`\n');
            }
        }
        indent(--tabs);
        append('}');
    }

    function camelToSnake(str) {
        if (typeof str !== 'string') {
            return '';
        }
        if (str.length < 2) {
            return str.toLowerCase();
        }
        str += 'L';
        let index = 0, strings = [];
        for (let i in str) {
            if (i === '0') {
                continue;
            }
            let decimal = str[i].charCodeAt(0);
            if (decimal >= 65 && decimal <= 90) {
                strings.push(str.substring(index, i).toLowerCase());
                index = i;
            }
        }
        return strings.join('_');
    }

    function indent(tabs) {
        for (let i = 0; i < tabs; i++)
            go += '\t';
    }

    function append(str) {
        go += str;
    }

    // Sanitizes and formats a string to make an appropriate identifier in Go
    function format(str) {
        if (!str)
            return '';
        else if (str.match(/^\d+$/))
            str = 'Num' + str;
        else if (str.charAt(0).match(/\d/)) {
            let numbers = {
                '0': 'Zero_', '1': 'One_', '2': 'Two_', '3': 'Three_',
                '4': 'Four_', '5': 'Five_', '6': 'Six_', '7': 'Seven_',
                '8': 'Eight_', '9': 'Nine_'
            };
            str = numbers[str.charAt(0)] + str.substr(1);
        }
        return toProperCase(str).replace(/[^a-z0-9]/ig, '') || 'NAMING_FAILED';
    }

    // Given two types, returns the more specific of the two
    function mostSpecificPossibleGoType(typ1, typ2) {
        if (typ1.substr(0, 5) === 'float'
            && typ2.substr(0, 3) === 'int')
            return typ1;
        else if (typ1.substr(0, 3) === 'int'
            && typ2.substr(0, 5) === 'float')
            return typ1;
        else
            return GoInterface;
    }

    // Proper cases a string according to Go conventions
    function toProperCase(str) {
        // https://github.com/golang/lint/blob/39d15d55e9777df34cdffde4f406ab27fd2e60c0/lint.go#L695-L731
        let commonInitialisms = [
            'API', 'ASCII', 'CPU', 'CSS', 'DNS', 'EOF', 'GUID', 'HTML', 'HTTP',
            'HTTPS', 'ID', 'IP', 'JSON', 'LHS', 'QPS', 'RAM', 'RHS', 'RPC', 'SLA',
            'SMTP', 'SSH', 'TCP', 'TLS', 'TTL', 'UDP', 'UI', 'UID', 'UUID', 'URI',
            'URL', 'UTF8', 'VM', 'XML', 'XSRF', 'XSS'
        ];

        return str.replace(/(^|[^a-zA-Z])([a-z]+)/g, function (unused, sep, frag) {
            if (commonInitialisms.indexOf(frag.toUpperCase()) >= 0)
                return sep + frag.toUpperCase();
            else
                return sep + frag[0].toUpperCase() + frag.substr(1).toLowerCase();
        }).replace(/([A-Z])([a-z]+)/g, function (unused, sep, frag) {
            if (commonInitialisms.indexOf(sep + frag.toUpperCase()) >= 0)
                return (sep + frag).toUpperCase();
            else
                return sep + frag;
        });
    }
}

export default jsonToGo;
