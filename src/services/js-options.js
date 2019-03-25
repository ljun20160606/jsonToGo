const ALL = {
  title: 'all annotations',
  value: 'all',
  key: 'all',
};

const JSON = {
  title: 'json',
  value: 'json',
  key: 'json',
};

const DB = {
  title: 'db',
  value: 'db',
  key: 'db',
};

const YAML = {
  title: 'yaml',
  value: 'yaml',
  key: 'yaml',
};

const Config = {
  title: 'config',
  value: 'config',
  key: 'config',
};

const Nested = {
  title: 'nested',
  value: 'nested',
  key: 'nested',
};

class Options {
  static data = {
    json: {
      key: 'json'
    },
    db: {
      key: 'db',
      isSnake: true
    },
    yaml: {
      key: 'yaml'
    }
  };

  static getTags(names) {
    return names.filter(value => Options.data[value]).map(value => Options.data[value]);
  }

  static getOption(list, select) {
    let tags = Options.getTags(select && select[0] === 'all' ?
      list.map(value => value.key) : select);
    let newVar = {
      tags,
      nested: (select.includes('nested'))
    };
    console.log(newVar);
    return newVar;
  }
}

export {ALL, JSON, DB, YAML, Options, Config, Nested};
