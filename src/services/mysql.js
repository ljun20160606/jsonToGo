// https://dev.mysql.com/doc/refman/5.6/en/string-type-overview.html
const buildin = {
  // numeric type
  bit: 'bit',
  tinyint: 'tinyint',
  bool: 'bool', boolean: 'boolean',
  smallint: 'smallint',
  mediumint: 'mediumint',
  int: 'int',
  bigint: 'bigint',
  integer: 'integer',
  decimal: 'decimal', dec: 'dec',
  float: 'float', real: 'real',
  double: 'double',
  // date and time type
  date: 'date',
  datetime: 'datetime',
  timestamp: 'timestamp',
  year: 'year',
  // string type
  char: 'char',
  varchar: 'varchar',
  text: 'text',
  tinytext: 'tinytext',
  mediumtext: 'mediumtext',
  longtext: 'longtext',
  enum: 'enum',
  set: 'set',
  binary: 'binary',
  varbinary: 'varbinary',
  blob: 'blob',
  tinyblob: 'tinyblob',
  mediumblob: 'mediumblob',
  longblob: 'longblob',
};

export {
  buildin,
}
