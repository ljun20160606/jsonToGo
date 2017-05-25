import React, { Component } from 'react';
import jsonToGo from '../js/json-to-go';
import { Layout, Menu, Breadcrumb, Input, Row, Col, Switch } from 'antd';
const {Header, Content, Footer} = Layout;


class JSON2Go extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: '',
            go: '',
            hasDB: true
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
            let go = jsonToGo(preState.json, "Go", {hasDB: this.state.hasDB}).go;
            return {go};
        });
    }

    changeHasDb() {
        this.setState(() => {
            return {hasDB: !this.state.hasDB};
        }, this.changeStruct);
    }

    render() {
        return (
            <Layout className="layout">
                <Header>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">JSON to Go</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '12px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <Row>
                            <Col span={20} push={2}>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Input type="textarea" placeholder="json" rows={16}
                                               onKeyUp={this.changeJson.bind(this)}/>
                                    </Col>
                                    <Col span={12}>
                                        <Input type="textarea" placeholder="go" rows={16}
                                               value={this.state.go}/>
                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col><Switch checkedChildren={'有db'} unCheckedChildren={'无db'}
                                                 defaultChecked={this.state.hasDB}
                                                 onChange={this.changeHasDb.bind(this)}/></Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    chromeAPP JSONToGo 测试版 © 2016 LJun
                </Footer>
            </Layout>
        );
    }
}

export default JSON2Go;
