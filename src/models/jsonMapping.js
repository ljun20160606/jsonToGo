import jsonToGo from '../services/json-to-go'
import { ALL, JSON, DB, Options } from '../services/js-options'

export default {
  namespace: 'jsonMapping',

  state: {
    treeData: [{
      ...ALL,
      children: [JSON, DB],
    }],
    select: ['all'],
    input: '',
    show: '',
    name: 'json',
    showHandler: jsonToGo,
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
