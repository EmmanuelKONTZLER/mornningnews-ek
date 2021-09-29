import React from 'react';
import './App.css';
import {Menu, Icon} from 'antd'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'

function Nav(props) {

  return (
    <nav >
      <Menu style={{textAlign: 'center'}} mode="horizontal" theme="dark">

        <Menu.Item key="mail">
          <Icon type="home" />
          Sources
          <Link to="/screensource" ></Link>
        </Menu.Item>

        <Menu.Item key="test">
          <Icon type="read" />
          My Articles
          <Link to="/screenmyarticles" ></Link>
        </Menu.Item>

        <Menu.Item key="app" onClick={() => props.addToken("")} >
          <Icon type="logout"/>
          Logout
          {/* <Link to="/" ></Link> */}
        </Menu.Item>

      </Menu>
    </nav>
  );
}


function mapDispatchToProps(dispatch){
  return {
    addToken: function(token){
      dispatch({type: 'addToken', token: token})
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Nav)
