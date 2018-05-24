import yamlToGo from '../services/yaml-to-go'
import jsOptions from '../services/js-options'

export default {
  namespace: 'yamlMapping',

  state: {
    treeData: [{
      label: '注解',
      value: 'all',
      key: 'all',
      children: [{
        label: 'yaml',
        value: 'yaml',
        key: 'yaml',
      }, {
        label: 'db',
        value: 'db',
        key: 'db',
      }],
    }],
    select: ['all'],
    input: '',
    show: '',
    name: 'yaml',
    showHandler: yamlToGo,
  },

  reducers: {
    input(state, {payload}) {
      let input = payload.input;
      let select = state.select;
      let show = state.showHandler(input, 'Go', jsOptions.getOption(state.treeData[0].children, select)).go;
      return {...state, input, show};
    },

    select(state, {payload}) {
      let input = state.input;
      let select = payload.select;
      let show = state.showHandler(input, 'Go', jsOptions.getOption(state.treeData[0].children, select)).go;
      return {...state, select, show};
    }
  }
}
