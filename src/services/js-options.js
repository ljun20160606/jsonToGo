const ALL = {
  label: 'all annotations',
  value: 'all',
  key: 'all',
};

const JSON = {
  label: 'json',
  value: 'json',
  key: 'json',
};

const DB = {
  label: 'db',
  value: 'db',
  key: 'db',
};

const YAML = {
  label: 'yaml',
  value: 'yaml',
  key: 'yaml',
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

  static getOptions(names) {
    let tags = names.filter(value => Options.data[value]).map(value => Options.data[value]);
    return {tags};
  }

  static getOption(list, select) {
    return Options.getOptions(select && select[0] === 'all' ?
      list.map(value => value.key) : select);
  }
}

export { ALL, JSON, DB, YAML, Options };
