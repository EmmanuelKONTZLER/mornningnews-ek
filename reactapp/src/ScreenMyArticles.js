import React, {useState, useEffect} from 'react';
import './App.css';
import { Card, Icon, Modal} from 'antd';
import Nav from './Nav'
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

const { Meta } = Card;

function ScreenMyArticles(props) {

  // Variables et états ↓↓↓

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [articles, setArticles] = useState([])

  // UseEffect

  useEffect(() => {
    async function loadData() {

    var data = await fetch(`/get-articles-in-wishlist?token=${props.token}`);
    data = await data.json()
    console.log(data)

    setArticles(data.articles);
    }
    loadData()
    },[])

  // Les fonctions ↓↓↓

  const showModal = (title, content) => {
    setIsModalVisible(true);
    setTitle(title);
    setContent(content)
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if(articles.length == 0) {
    var articleList = <div style={{marginTop: "15px", color: "red" }}>No article liked</div>
  } else {     
    console.log('123', articles)
    var articleList = articles.map((article, i) => {
      return(
        <div key={i} style={{display:'flex',justifyContent:'center'}}>
                    <Card
                      style={{  
                        width: 300, 
                        margin:'15px', 
                        display:'flex',
                        flexDirection: 'column',
                        justifyContent:'space-between' }}
                      cover={
                      <img
                          alt="example"
                          src={article.urlToImage}
                      />                        
                      }                        
                      actions={[
                        <Icon type="read" key="ellipsis2" onClick={() => showModal(article.title, article.content)}/>,
                        <Icon type="delete" key="ellipsis" onClick={() => props.deteleArticle(article.title,)} />
                      ]}
                      >                          
                      <Meta
                        title={article.title}
                        description={article.description}
                      />                  
                    </Card>
                  </div>
      )
    })
  }
  if (!props.token) {
    return(
      <Redirect to='/' />
    )
  }


  return (
    <div>         
      <Nav/>
      <div className="Banner"/>
      <div className="Card">
        {articleList}
        <Modal title={title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <p>{content}</p>
        </Modal>
      </div>
    </div>
  );
}


function mapStateToProps(state) {
  return { articles: state.articles, token: state.token }
}

function mapDispatchToProps(dispatch) {
  return {
    deteleArticle: function(title) {
    dispatch( {type: 'deleteArticle', title: title} )
    }
  }
}
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenMyArticles);