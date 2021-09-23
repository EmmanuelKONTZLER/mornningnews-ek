import React,{useEffect, useState} from 'react';
import './App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav'
import { Link } from 'react-router-dom';

// https://newsapi.org/docs/endpoints/sources

function ScreenSource() {

  const [sourceList, setSourceList] = useState([]);


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

    console.log('02', sourceList.sources)

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

export default ScreenSource;
