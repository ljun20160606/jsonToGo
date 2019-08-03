const jsonOption = {
  omitempty: 'omitempty'
};

const buildin = {
  string: 'string',
  bytes: '[]byte',
  int: 'int', int8: 'int8', int16: 'int16', int32: 'int32', int64: 'int64',
  uint: 'uint', uint8: 'uint8', uint16: 'uint16', uint32: 'uint32', uint64: 'uint64',
  bool: 'bool',
  float32: 'float32', float64: 'float64',
  interface: 'interface{}',
  time: 'time.Time',
  slice: 'slice',
  struct: 'struct',
  type: 'type',
};

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

// Proper cases a string according to Go conventions
function toProperCase(str) {
  // https://github.com/golang/lint/blob/5614ed5bae6fb75893070bdc0996a68765fdd275/lint.go#L771-L810
  const commonInitialisms = [
    "ACL", "API", "ASCII", "CPU", "CSS", "DNS", "EOF", "GUID", "HTML", "HTTP",
    "HTTPS", "ID", "IP", "JSON", "LHS", "QPS", "RAM", "RHS", "RPC", "SLA",
    "SMTP", "SQL", "SSH", "TCP", "TLS", "TTL", "UDP", "UI", "UID", "UUID",
    "URI", "URL", "UTF8", "VM", "XML", "XMPP", "XSRF", "XSS"
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

export {
  buildin,
  jsonOption,
  format,
}
