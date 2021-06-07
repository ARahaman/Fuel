import React from 'react';
import './App.css';
import './index.css';
import Blog from './components/Blog';
import Blogs from './components/Blogs';
import BlogEditor from './components/BlogEditor';
import Stories from './components/Stories'
import StoryEditor from './components/StoryEditor'
import Story from './components/Story'
import Header from './components/Header';
import Footer from './components/Footer';
import EmployeeForm from './components/EmployeeForm';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

const App = () => {
  if(window.location.pathname!='/' && window.location.pathname!='/login'){
    if(!sessionStorage.getItem('authorization') && !sessionStorage.getItem('authorization')==="undefined"){
      window.location='http://localhost:3000'
    }
  }
  return (
    <div>
      <Router>
        <Header></Header>
        {/* <img src={'/logo.png'} className='watermark'/> */}
        <div style={ { minHeight: '600px' } }>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={EmployeeForm} />
          </Switch>
        </div>
      </Router>
      <Footer></Footer>
    </div>
  );
}

export default App;
