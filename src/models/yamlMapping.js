import yamlToGo from '../services/yaml-to-go'
import {ALL, YAML, DB, Options, Config, Nested} from '../services/js-options'

export default {
  namespace: 'yamlMapping',

  state: {
    treeData: [{
      ...ALL,
      children: [YAML, DB],
    }, {
      ...Config,
      children: [Nested],
    }],
    select: [YAML.key],
    input: '',
    show: '',
    name: 'yaml',
    showHandler: yamlToGo,
  },

  reducers: {
    input(state, {payload}) {
      let input = payload.input;
      let select = state.select;
      let show = state.showHandler(input, 'Go', Options.getOption(state.treeData[0].children, select)).go;
      return {...state, input, show};
    },

    select(state, {payload}) {
      let input = state.input;
      let select = payload.select;
      let show = state.showHandler(input, 'Go', Options.getOption(state.treeData[0].children, select)).go;
      return {...state, select, show};
    }
  }
}
