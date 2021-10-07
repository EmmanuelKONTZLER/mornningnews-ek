import React, {useState, useEffect} from 'react';
import './App.css';
import { Card, Icon, Modal} from 'antd';
import Nav from './Nav'
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

const { Meta } = Card;

function ScreenMyArticles(props) {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [articles, setArticles] = useState([])

  useEffect(() => {
    async function loadData() {

      var data = await fetch(`/get-articles-in-wishlist?token=${props.token}`);
      data = await data.json()
      setArticles(data.articles);
    }
    loadData()
  },[])

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

  
  var deleteArticle = async (article) => {

    var data = await fetch(`/delete-article?token=${props.token}&id=${article}`,{
    method: 'DELETE'});
    data = await data.json()
    setArticles(data.articles)
  }


  if(articles.length == 0) {
    var articleList = <div style={{marginTop: "15px", color: "red" }}>No article liked</div>
  } else {     
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
              <Icon type="delete" key="ellipsis" onClick={() => deleteArticle(article._id)} />
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
  return { 
    token: state.token }
}
  
export default connect(
  mapStateToProps,
  null
)(ScreenMyArticles);