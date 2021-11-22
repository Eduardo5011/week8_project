import React, { Component } from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './views/Home'
import Page2 from './views/Page2'
import Example from './views/Example'
import Login from './views/Login'
import Logout from './views/Logout'

import ProtectedRoute from './components/ProtectedRoute'
import NavBar from './components/NavBar'

import 'bootstrap/dist/css/bootstrap.min.css';


export default class App extends Component {
  constructor(){
    super();
    this.state={
      test:"This is a test",
      user:'',
      token:'',
      
    }
  }




  render() {
    return (
      <div>
          <NavBar/>
        <Routes>
          <Route path = '/' element={<Home />}/>
          <Route path = '/page2' element={<Page2 />}/>
          <Route path = '/example' element={<Example />}/>
          <Route path = '/logout' element={<Logout setToken={this.setToken} />}/>

          <Route path = '/login' element={<Login setToken={this.setToken}/> }/>
          {/* <Route path = '/login' element={<Login setToken={this.setToken}/>}/> */}
        </Routes>
      </div>
    )
  }
}



