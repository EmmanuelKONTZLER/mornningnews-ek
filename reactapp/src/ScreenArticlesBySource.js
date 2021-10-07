import React, { useEffect, useState } from 'react';
import './App.css';
import { Card, Icon, Modal } from 'antd';
import Nav from './Nav'
import { useParams, Redirect } from "react-router-dom";
import {connect} from 'react-redux';

const { Meta } = Card;

function ScreenArticlesBySource(props) {

  var { id } = useParams();
  const [articles, setArticles] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")


  useEffect(() => {
    async function loadData() {
      var data2 = await fetch(`/get-articles-by-source?id=${id}`);
      data2 = await data2.json()
      setArticles(data2.articles.articles);
    }
    loadData()
  },[id])

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

    var addOnWishlist = async (title, content, description, urlToImage) => {
      var newArticle = await fetch('/add-on-wishlist', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `token=${props.token}&title=${title}&content=${content}&description=${description}&urlToImage=${urlToImage}`
      });
      newArticle = await newArticle.json();
    }
  
  var articleList = articles.map((article, i)=>{

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
            <Icon type="read" key="ellipsis2" onClick={() => showModal(article.title, article.content)}></Icon>,
            <Icon type="like" key="ellipsis" onClick={() => addOnWishlist(article.title, article.content, article.description, article.urlToImage)}/>
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
      </div> 
      <Modal title={title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <p>{content}</p>
      </Modal>
    </div>
  );
}

function mapStateToProps(state) {
  return { token: state.token }
}
  
export default connect(
mapStateToProps,
null
)(ScreenArticlesBySource);
