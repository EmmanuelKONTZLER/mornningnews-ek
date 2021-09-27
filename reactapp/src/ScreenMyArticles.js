import React, {useState} from 'react';
import './App.css';
import { Card, Icon, Modal} from 'antd';
import Nav from './Nav'
import {connect} from 'react-redux';

const { Meta } = Card;

function ScreenMyArticles(props) {

  // Variables et états ↓↓↓

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

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

  if(props.articles.length == 0) {
    var articleList = <div style={{marginTop: "15px", color: "red" }}>No article liked</div>
  } else {     

    var articleList = props.articles.map((article, i) => {
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
                          src={article.image}
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
  return { articles: state.articles }
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