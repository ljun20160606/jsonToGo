import yaml from 'js-yaml';
import jsToGo from './js-to-go';

function yamlToGo(json, typename, options) {
  if (json.trim() === '') {
    return {
      go: '',
    };
  }
  let data;
  try {
    data = yaml.load(json);
  } catch (e) {
    return {
      go: '',
      error: {
        token: {
          line: e.mark.line,
          col: e.mark.column,
          text: e.message,
        },
      },
    };
  }
  return jsToGo(data, typename, options);
}

export default yamlToGo;
