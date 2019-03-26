import React from 'react';
import {Row, Col, TreeSelect, Button, notification} from 'antd';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import AceEditor from 'react-ace';

import 'brace/mode/golang';
import 'brace/mode/yaml';
import 'brace/mode/json';
import 'brace/theme/textmate';
import 'brace/ext/searchbox';

const Mapping = ({onInput, onSelect, dataSource, searchPlaceholder, leftMode, rightMode}) => {
  const tProps = {
    treeData: dataSource.treeData,
    value: dataSource.select,
    onChange: onSelect,
    treeCheckable: true,
    searchPlaceholder: searchPlaceholder || 'Please select',
    style: {
      width: 300,
    },
  };

  const openNotification = () => {
    notification.open({
      message: 'Copied',
      description: '',
    });
  };
  return (
    <Row>
      <Col span={22} push={1}>
        <Row>
          <TreeSelect {...tProps} />
        </Row>
        <br/>
        <Row gutterd={16}>
          <Col span={12}>
            <AceEditor
              useSoftTabs={true}
              tabSize={2}
              fontSize={14}
              highlightActiveLine={false}
              mode={leftMode}
              theme="textmate"
              value={dataSource.input}
              onChange={(value) => {
                onInput(value);
              }}
              name="input"
              editorProps={{$blockScrolling: true}}
              enableBasicAutocompletion={true}
              enableLiveAutocompletion={true}
            />
          </Col>
          <Col span={12}>
            <AceEditor
              useSoftTabs={true}
              fontSize={14}
              readOnly={true}
              highlightActiveLine={false}
              mode={rightMode}
              theme="textmate"
              value={dataSource.show}
              onChange={(value) => {
              }}
              name="output"
              editorProps={{$blockScrolling: true}}
            />
          </Col>
        </Row>
        <br/>
        <Row>
          <CopyToClipboard text={dataSource.show} onCopy={openNotification}>
            <Button size={"large"}>Copy</Button>
          </CopyToClipboard>
        </Row>
      </Col>
    </Row>
  );
};

export default Mapping;
