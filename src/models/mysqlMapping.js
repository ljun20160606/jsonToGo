import mysqlToGo from "@/services/mysql-to-go";
import { onChange } from "@/models/helpers";
import { ALL, YAML, DB, Config, Nested, JSON } from '@/services/js-options'

const innerState = {
  treeData: [{
    ...ALL,
    children: [JSON, YAML, DB],
  }, {
    ...Config,
    children: [Nested],
  }],
  select: [DB.key],
  input: `CREATE TABLE users (
  id integer(11) NOT NULL AUTO_INCREMENT COMMENT 'id primary',
  nickname longtext NOT NULL,
  deleted_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB COMMENT 'All system users';`,
  show: '',
  name: 'db',
  showHandler: mysqlToGo,
};

export default {
  namespace: 'mysqlMapping',

  state: {
    ...onChange(innerState)
  },

  reducers: {
    input(state, {payload}) {
      return onChange({...state, ...payload});
    },
  }
}
