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
      name:''
    }
  }


  setUser = (user) =>{
    this.setState({user})
  }

  

  setToken = (token) =>{
      this.setState({token})
      localStorage.setItem('token',token)
  }


  setName =() =>{
    let name = ''
    fetch('https://fakestoreapi.com/users')
            .then(res=>{
              for(let user of res.data){
                name = user.name
              
            .then(json=>console.log(json))
            localStorage.setItem('name',name)
  }
})
}

  render() {
    return (
      <div>
        <NavBar token={this.state.token}/>
        <Routes>

          <Route exact path='/' element={
            <ProtectedRoute token={this.state.token}>
              <Home token={this.state.token} setToken={this.setToken}/>
            </ProtectedRoute>
            }/>

          <Route exact path='/page2' element={
            <ProtectedRoute token={this.state.token}>
              <Page2 addFood = {this.addFood} setUser={this.setUser} test = {this.state.test} />
            </ProtectedRoute>
            }/>

          {/* <Route exact path='/page3' element={
            <ProtectedRoute token={this.state.token}>
              <Page3 user = {this.state.user} foods={this.state.foods}/>
            </ProtectedRoute>
            }/> */}

          <Route exact path='/example' element={
            <ProtectedRoute token={this.state.token}>
              <Example />
            </ProtectedRoute>
            }/>

          <Route exact path='/logout' element={
            <ProtectedRoute token={this.state.token}>
              <Logout setToken={this.setToken}/>
            </ProtectedRoute>
            }/>

          {/* <Route exact path='/shop' element={
            <ProtectedRoute token={this.state.token}>
              <Shop/>
            </ProtectedRoute>
            }/> */}




            <Route path = '/login' element={
              <Login setToken={this.setToken} token={this.state.token} setName={this.setName}/>
            }/>
          </Routes>
        </div>
      );
    }
  }

//   render() {
//     return (
//       <div>
//           <NavBar token/>
//         <Routes>
//           <Route path = '/' element={<Home />}/>
//           <Route path = '/page2' element={<Page2 />}/>
//           <Route path = '/example' element={<Example />}/>
//           <Route path = '/logout' element={<Logout setToken={this.setToken} />}/>

//           <Route path = '/login' element={<Login setToken={this.setToken}/> }/>
//           {/* <Route path = '/login' element={<Login setToken={this.setToken}/>}/> */}
//         </Routes>
//       </div>
//     )
//   }
// }



