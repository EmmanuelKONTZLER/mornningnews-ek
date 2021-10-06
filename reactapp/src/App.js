import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ScreenHome from './ScreenHome';
import ScreenSource from './ScreenSource';
import ScreenMyArticles from './ScreenMyArticles';
import ScreenArticlesBySource from './ScreenArticlesBySource';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
// import articles from './reducer/articles';
import token from './reducer/token';

const store = createStore(combineReducers({
  // articles,
  token
}));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={ScreenHome} />
          <Route path="/screensource" component={ScreenSource}  />
          <Route path="/screenarticlesbysource/:id" component={ScreenArticlesBySource}  />
          <Route path="/screenmyarticles" component={ScreenMyArticles}  />
        </Switch>
      </Router>
    </Provider>
  );
  
}

export default App;
