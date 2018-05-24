import React from 'react';
import { Input, Row, Col, TreeSelect } from 'antd';

const Mapping = ({onInput, onSelect, dataSource, searchPlaceholder, leftPlaceHolder, rightPlaceHolder}) => {
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
  return (
    <Row>
      <Col span={22} push={1}>
        <Row>
          <TreeSelect {...tProps} />
        </Row>
        <br/>
        <Row gutterd={16}>
          <Col span={12}>
            <Input.TextArea placeholder={leftPlaceHolder} rows={16} onChange={onInput} value={dataSource.input}/>
          </Col>
          <Col span={12}>
            <Input.TextArea placeholder={rightPlaceHolder} rows={16} value={dataSource.show}/>
          </Col>
        </Row>
        <br/>
      </Col>
    </Row>
  );
};

export default Mapping;
