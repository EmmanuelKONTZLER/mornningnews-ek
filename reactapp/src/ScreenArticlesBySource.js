import React, { useEffect, useState } from 'react';
import './App.css';
import { Card, Icon, Modal, Button} from 'antd';
import Nav from './Nav'
import { useParams } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import {connect} from 'react-redux';

const { Meta } = Card;

function ScreenArticlesBySource(props) {

  // Variables et états ↓↓↓

  var { id } = useParams();
  const [articles, setArticles] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  // Hook d'éffet ↓↓↓

  useEffect(() => {
    async function loadData() {

    var data2 = await fetch(`/get-articles-by-source?id=${id}`);
    data2 = await data2.json()
    // console.log('data2', data2)

    // console.log('id', id)
    // var data = await fetch(`https://newsapi.org/v2/top-headlines?sources=${id}&apiKey=e515a8b211364216a98fced7350dd278`);
    // data = await data.json();
    // console.log(data);
    setArticles(data2.articles.articles);
    }
    loadData()
    },[id])

// console.log("etat article",articles)

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
  

  // Boucle ↓↓↓

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
            <Icon type="like" key="ellipsis" onClick={() => props.articleOnWishlist(article.title, article.content, article.description, article.urlToImage)}/>
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

function mapDispatchToProps(dispatch) {
  return {
    articleOnWishlist: function(title, content, description, image) {
    dispatch( {type: 'addArticle', title: title, content: content, description: description, image: image } )
    }
  }
}
  
export default connect(
null,
mapDispatchToProps
)(ScreenArticlesBySource);
