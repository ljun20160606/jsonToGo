import React from 'react';
import { Row, Col, TreeSelect, Button, notification, Input, Radio } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import AceEditor from 'react-ace';
import { isNested } from "@/services/js-options";

import 'brace/mode/golang';
import 'brace/mode/yaml';
import 'brace/mode/json';
import 'brace/mode/mysql';
import 'brace/theme/textmate';
import 'brace/ext/searchbox';
import 'brace/ext/language_tools'

const Mapping = ({onInput, dataSource, searchPlaceholder, leftMode, rightMode}) => {
  const tProps = {
    treeData: dataSource.treeData,
    value: dataSource.select,
    onChange: (select) => {
      return onInput({select});
    },
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
          <Col span={12}>
            <TreeSelect {...tProps} />
          </Col>
          {
            dataSource.hasName ? [
              <Col key='structName' span={4}>
                <Input placeholder="name" value={dataSource.structName} onChange={(e) => {
                  onInput({structName: e.target.value});
                }}/>
              </Col>,
              !isNested(dataSource.select) ? <Col key='prefix' span={6} push={1}>
                <div>
                  <Radio.Group buttonStyle="solid" value={dataSource.hasPrefix ? 'p' : 'd'} onChange={(e) => {
                    onInput({hasPrefix: !dataSource.hasPrefix})
                  }}>
                    <Radio.Button value={'p'}>PrefixName</Radio.Button>
                    <Radio.Button value={'d'}>Default</Radio.Button>
                  </Radio.Group>
                </div>
              </Col> : null
            ] : null
          }
        </Row>
        <br/>
        <Row gutterd={16}>
          <Col span={12}>
            <AceEditor
              annotations={dataSource.annotations}
              height={'420px'}
              useSoftTabs={true}
              tabSize={2}
              fontSize={14}
              highlightActiveLine={false}
              mode={leftMode}
              theme="textmate"
              value={dataSource.input}
              onChange={(value) => {
                onInput({input: value});
              }}
              name="input"
              editorProps={{$blockScrolling: true}}
              enableBasicAutocompletion={true}
              enableLiveAutocompletion={true}
            />
          </Col>
          <Col span={12}>
            <AceEditor
              height={'420px'}
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
          <Col push={12}>
            <CopyToClipboard text={dataSource.show} onCopy={openNotification}>
              <Button size={"large"} htmlType={'button'}>Copy right</Button>
            </CopyToClipboard>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Mapping;
