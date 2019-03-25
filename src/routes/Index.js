import React from 'react';
import { connect } from "dva/index";
import { Layout, Menu, Breadcrumb } from 'antd';
import Mapping from '../components/Mapping';
import './Index.css';

const {Header, Content, Footer} = Layout;

class Index extends React.Component {

  onInput(name) {
    return function (input) {
      this.props.dispatch({
        type: `${name}Mapping/input`,
        payload: {input},
      });
    }
  }

  onSelect(name) {
    return function (select) {
      this.props.dispatch({
        type: `${name}Mapping/select`,
        payload: {select},
      });
    }
  }

  menuHandler(selectParam) {
    this.props.history.push(`/${selectParam.key}`)
  }

  render() {
    const {onInput, onSelect, props} = this;
    const {match} = props;
    const items = ['json', 'yaml'];
    return (<Layout className="layout" style={{minHeight: '100vh'}}>
      <Header>
        <div className="logo"/>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[match.path.replace('/', '')]}
          style={{lineHeight: '64px'}}
          onSelect={this.menuHandler.bind(this)}
        >
          {
            items.map(value => <Menu.Item key={value}>{value}</Menu.Item>)
          }
        </Menu>
      </Header>
      <Content style={{padding: '0 50px'}}>
        <Breadcrumb style={{margin: '16px 0'}}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>{match.path.replace('/', '')}</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{background: '#fff', padding: 24, minHeight: 280}}>
          {
            items
              .filter(value => match.path === `/${value}`)
              .map(name => <Mapping key={name}
                                    searchPlaceholder={'Select Annotations'}
                                    onInput={onInput(name).bind(this)}
                                    onSelect={onSelect(name).bind(this)}
                                    dataSource={props[name + 'Mapping']}
                                    leftMode={name === 'json' ? 'javascript' : name}
                                    rightMode={'golang'}
              />)
          }
        </div>
      </Content>
      <Footer style={{textAlign: 'center'}}>
        To Go ©2018 Created by ljun20160606
      </Footer>
    </Layout>);
  }
}

Index.propTypes = {};

export default connect(({jsonMapping, yamlMapping}) => ({
  jsonMapping, yamlMapping
}))(Index);
