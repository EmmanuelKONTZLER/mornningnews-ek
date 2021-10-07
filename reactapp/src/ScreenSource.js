import React,{useEffect, useState} from 'react';
import './App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav'
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';


function ScreenSource(props) {

  const [sourceList, setSourceList] = useState([]);
  const [language, setLanguage] = useState ("fr")
  const [country, setCountry] = useState("fr")

  useEffect(() => {
    async function loadData() {
  
      var data = await fetch(`/get-sources?language=${language}&country=${country}`);
      data = await data.json();
      setSourceList(data.sources);
    }
    loadData()
  },[language])


  if (!props.token) {
    return(
      <Redirect to='/' />
    )
  }
  

  return (
    <div>
        <Nav/>
       
       <div className="Banner">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1280px-Flag_of_France.svg.png"  
             className="flag"
             onClick={() => {setLanguage("fr"); setCountry("fr")}}/>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Flag_of_Great_Britain_%281707%E2%80%931800%29.svg/2560px-Flag_of_Great_Britain_%281707%E2%80%931800%29.svg.png" 
             className="flag"
             onClick={() => {setLanguage("en"); setCountry("gb")}}/>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/2560px-Flag_of_Spain.svg.png" 
             className="flag" 
             onClick={() => {setLanguage("es"); setCountry("")}}/>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/2560px-Flag_of_Portugal.svg.png" 
             className="flag" 
             onClick={() => {setLanguage("pt"); setCountry("")}}/>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Flag_of_Italy_with_border.svg/1500px-Flag_of_Italy_with_border.svg.png" 
             className="flag" 
             onClick={() => {setLanguage("it"); setCountry("it")}}/>
       </div>

       <div className="HomeThemes">
          
              <List
                  itemLayout="horizontal"
                  dataSource={sourceList.sources}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
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