import { Options } from "@/services/js-options";

function onChange(state) {
  let {input, structName, select, showHandler, hasPrefix} = state;
  let options = Options.getOption(state.treeData[0].children, select);
  if (hasPrefix) {
    options = {...options, prefix: structName};
  }
  let show = showHandler(input, structName, options).go;
  return {...state, show};
}

export {
  onChange
}
