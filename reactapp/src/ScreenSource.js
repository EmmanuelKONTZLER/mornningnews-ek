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
  const [language, setLanguage] = useState ("en")
  const [country, setCountry] = useState("gb")

  console.log("token", props.token)
  useEffect(() => {
    async function loadData() {
  
    // var sources = await fetch('https://newsapi.org/v2/top-headlines/sources?&country=fr&language=fr&apiKey=e515a8b211364216a98fced7350dd278');
    // sources = await sources.json();
    // console.log(sources);
    var data = await fetch(`/get-sources?language=${language}&country=${country}`);
    data = await data.json()
    // console.log('data', data.sources.sources)
    
 
    setSourceList(data.sources);
    }
    loadData()
    },[language])

    console.log('token in screensource', props.token)

    if (!props.token) {
      return(
        <Redirect to='/' />
      )
    }
  

  return (
    <div>
        <Nav/>
       
       <div className="Banner">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1280px-Flag_of_France.svg.png" className="flag" onClick={() => {setLanguage("fr"); setCountry("fr")}}/>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Flag_of_Great_Britain_%281707%E2%80%931800%29.svg/2560px-Flag_of_Great_Britain_%281707%E2%80%931800%29.svg.png" className="flag" onClick={() => {setLanguage("en"); setCountry("gb")}}/>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/2560px-Flag_of_Spain.svg.png" className="flag" onClick={() => {setLanguage("es"); setCountry("")}}/>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/2560px-Flag_of_Portugal.svg.png" className="flag" onClick={() => {setLanguage("pt"); setCountry("")}}/>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Flag_of_Italy_with_border.svg/1500px-Flag_of_Italy_with_border.svg.png" className="flag" onClick={() => {setLanguage("it"); setCountry("it")}}/>
       </div>

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