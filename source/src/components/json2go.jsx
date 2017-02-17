import React, {Component} from 'react';
import jsonToGo from '../js/json-to-go';
import {Menu, Input, Row, Col, Switch} from 'antd';

class JsonToStruct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: '',
            struct: '',
            hasDb: true
        }
    }

    changeJson(e) {
        let json = e.target.value;
        this.setState(() => {
                return {
                    json: json
                }
            },
            this.changeStruct);
    }

    changeStruct() {
        this.setState((preState) => {
            let struct;
            struct = jsonToGo(preState.json, "goStruct", {hasDb: this.state.hasDb}).go;
            return {struct};
        });
    }

    changeHasDb() {
        this.setState(() => {
            return {hasDb: !this.state.hasDb};
        }, this.changeStruct);
    }

    render() {
        return (
            <div className="ant-layout">
                <div className="ant-layout-header">
                    <div className="ant-layout-wrapper">
                        <Menu mode="horizontal"
                              defaultSelectedKeys={['1']} style={{lineHeight: '64px'}}>
                            <Menu.Item key="1">jsonToStruct</Menu.Item>
                        </Menu>
                    </div>
                </div>
                <div className="ant-layout-wrapper">
                    <div className="ant-layout-container">
                        <Row>
                            <Col span={20} push={2}>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Input type="textarea" placeholder="json" rows={16}
                                               onKeyUp={this.changeJson.bind(this)}/>
                                    </Col>
                                    <Col span={12}>
                                        <Input type="textarea" placeholder="struct" rows={16}
                                               value={this.state.struct}/>
                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col><Switch checkedChildren={'有db'} unCheckedChildren={'无db'}
                                                 defaultChecked={this.state.hasDb}
                                                 onChange={this.changeHasDb.bind(this)}/></Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="ant-layout-footer">
                    chromeApp jsonToStruct 测试版 © 2016 LJun
                </div>
            </div>
        );
    }
}

export default JsonToStruct;
