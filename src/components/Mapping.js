import React from 'react';
import { Row, Col, TreeSelect, Button, notification } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Controlled } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';

const Mapping = ({onInput, onSelect, dataSource, searchPlaceholder, leftMode, rightMode, theme}) => {
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
            <Controlled
              value={dataSource.input}
              options={{
                mode: leftMode,
                theme: theme || 'material',
                lineNumbers: true
              }}
              onBeforeChange={(editor, data, value) => {
                onInput(value);
              }}
            />
          </Col>
          <Col span={12}>
            <Controlled
              value={dataSource.show}
              options={{
                mode: rightMode,
                theme: theme || 'material',
                lineNumbers: true
              }}
              onBeforeChange={(editor, data, value) => {
              }}/>
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
