import { Options } from "@/services/js-options";

function onChange(state) {
  let {input, structName, select, showHandler, hasPrefix} = state;
  let options = Options.getOption(state.treeData[0].children, select);
  if (hasPrefix) {
    options = {...options, prefix: structName};
  }
  let {go, error} = showHandler(input, structName, options);
  let annotations = [];
  if (error) {
    if (error.hasOwnProperty('token')) {
      annotations.push({
        row: error.token.line - 1,
        column: error.token.col,
        text: error.token.text,
        type: "error"
      });
    }
  }
  return {...state, show: go, annotations: annotations};
}

export {
  onChange
}
