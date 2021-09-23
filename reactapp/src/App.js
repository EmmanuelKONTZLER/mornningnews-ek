import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ScreenHome from './ScreenHome';
import ScreenSource from './ScreenSource';
import ScreenMyArticles from './ScreenMyArticles';
import ScreenArticlesBySource from './ScreenArticlesBySource';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ScreenHome} />
        <Route path="/screensource" component={ScreenSource}  />
        <Route path="/screenarticlesbysource/:id" component={ScreenArticlesBySource}  />
        <Route path="/screenmyarticles" component={ScreenMyArticles}  />
      </Switch>
    </Router>
  );
  
}

export default App;
