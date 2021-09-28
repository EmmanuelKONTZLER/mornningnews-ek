import React,{useEffect, useState} from 'react';
import './App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav'
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

// https://newsapi.org/docs/endpoints/sources

function ScreenSource(props) {

  const [sourceList, setSourceList] = useState([]);
  const [token, setToken] = useState("")

  console.log("token", props.token)
  useEffect(() => {
    async function loadData() {
  
    // var sources = await fetch('https://newsapi.org/v2/top-headlines/sources?&country=fr&language=fr&apiKey=e515a8b211364216a98fced7350dd278');
    // sources = await sources.json();
    // console.log(sources);
    var data = await fetch('/get-sources');
    data = await data.json()
    // console.log('data', data.sources.sources)
    
 
    setSourceList(data.sources);
    }
    loadData()
    },[])

    console.log('token in screensource', props.token)

    if (!props.token) {
      return(
        <Redirect to='/' />
      )
    }
  

  return (
    <div>
        <Nav/>
       
       <div className="Banner"/>

       <div className="HomeThemes">
          
              <List
                  itemLayout="horizontal"
                  dataSource={sourceList.sources}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        avatar={<Avatar src={`/images/${item.category}.png`} />}
                        title={<Link to={`/screenarticlesbysource/${item.id}`} >{item.name}</Link>}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
          </div>                 
      </div>
  );
}



function mapStateToProps(state) {
  return { token: state.token }
}

  
export default connect(
  mapStateToProps,
  null
)(ScreenSource);