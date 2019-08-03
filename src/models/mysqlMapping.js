import mysqlToGo from '../services/mysql-to-go'
import { ALL, YAML, DB, Options, Config, Nested, JSON } from '../services/js-options'

export default {
  namespace: 'mysqlMapping',

  state: {
    treeData: [{
      ...ALL,
      children: [JSON, YAML, DB],
    }, {
      ...Config,
      children: [Nested],
    }],
    select: [DB.key],
    input: '',
    show: '',
    name: 'db',
    showHandler: mysqlToGo,
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
