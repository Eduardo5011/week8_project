import React, { Component } from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './views/Home'
// import Page2 from './views/Page2'
// import Example from './views/Example'
import Shop from './views/Shop'
import Login from './views/Login'
import Logout from './views/Logout'
import SingleItem from './views/SingleItem'
// import {getIsAdmin} from './api/apiAdmin'
// import AdminRoute from './components/AdminRoute'
// import AdminRoute from './components/AdminRoute';
import CreateCats from './views/CreateCats'
import EditCats from './views/EditCats'
import Cart from './views/Cart';



import ProtectedRoute from './components/ProtectedRoute'
import NavBar from './components/NavBar'

import 'bootstrap/dist/css/bootstrap.min.css';


export default class App extends Component {
  constructor(){
    super();
    this.state={
      // test:"This is a test",
      user:'',
      token:'',
      name:'',
      // isAdmin:false,
      setName:'',
      username:'',
      cartTotal:0,
      itemToEdit:[],
      cart:[]
      

    }
  }


  setUser = (user) =>{
    this.setState({user})
  }

 

  setToken = (token) =>{
      this.setState({token})
      localStorage.setItem('token',token)
      // this.getIsAdmin()
  }

  

  setName =(username) =>{
    
    fetch('https://fakestoreapi.com/users')
      .then(res=>{
          return res.json()
      })
      .then(res=>{
        for(let user of res){
         
         if (username === user.username){
           this.setState({username})
           
         }
        }
      })
    }

static getDerivedStateFromProps = (props,state)=>{
  return {"token":localStorage.getItem('token')}
}


addToUserCart = (item) =>{
  let cart = this.state.cart;
  let cartTotal = this.state.cartTotal;
  cart.push(item);
  cartTotal+=parseFloat(item.price);
  this.setState({cart:cart, cartTotal:cartTotal}, ()=>console.log("cart updated."))
}





  render() {
    return (
      <div>
        <NavBar 
        token={this.state.token}
        username={this.state.username}
        />
        <Routes>

        

          

          <Route path='/' element={
            <ProtectedRoute token={this.state.token}>
              <Home token={this.state.token} setToken={this.setToken}/>
            </ProtectedRoute>
            }/>

            <Route path = '/cart' element={
            <ProtectedRoute token={this.state.token}>
              <Cart cart={this.state.cart} cartTotal={this.state.cartTotal}/>
            </ProtectedRoute>
          }/> 

            

          {/* <Route path='/page2' element={
            <ProtectedRoute token={this.state.token}>
              <Page2 addFood = {this.addFood} setUser={this.setUser} test = {this.state} />
            </ProtectedRoute>
            }/> */}

          {/* <Route exact path='/page3' element={
            <ProtectedRoute token={this.state.token}>
              <Page3 user = {this.state.user} foods={this.state.foods}/>
            </ProtectedRoute>
            }/> */}

          {/* <Route exact path='/example' element={
            <ProtectedRoute token={this.state.token}>
              <Example />
            </ProtectedRoute>
            }/> */}

            <Route path='/shop' element={
            <ProtectedRoute token={this.state.token}>
              <Shop/>
            </ProtectedRoute>
            }/>

<Route path='/item/:id' element={
            <ProtectedRoute token={this.state.token}>
              <SingleItem />
            </ProtectedRoute>
            }/>

            <Route path='/createcats' element={
            <ProtectedRoute idAdmin = {this.state.isAdmin} token={this.state.token}>
              <CreateCats/>
            </ProtectedRoute>
            }/>


            <Route path='/editcats' element={
            <ProtectedRoute idAdmin = {this.state.isAdmin} token={this.state.token}>
              <EditCats/>
            </ProtectedRoute>
            }/>

            {/* <Route exact path='/createcats' element={
            <ProtectedRoute token={this.state.token}>
              <Shop/>
            </ProtectedRoute>
            }/> */}

          <Route path='/logout' element={
            <ProtectedRoute token={this.state.token}>
              <Logout setToken={this.setToken}/>
            </ProtectedRoute>
            }/>

          

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



