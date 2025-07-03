import { Component } from "react";
import { BrowserRouter , Routes ,Route  } from "react-router-dom";

import "./App.css"

import Context from "./context/Context";

import Login from "./components/Login";
import Home from "./components/Home";
import Products from "./components/Products";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
// /products


class App extends Component{
  state={cartList:[]}
componentDidMount() {
    const storedCart = localStorage.getItem('cartList')
    if (storedCart) {
      this.setState({ cartList: JSON.parse(storedCart) })
    }
  }
    componentDidUpdate(prevProps, prevState) {
    if (prevState.cartList !== this.state.cartList) {
      localStorage.setItem('cartList', JSON.stringify(this.state.cartList))
    }
  }

  addCartProduct=(product)=>{
    const{cartList}=this.state
    const productObject = cartList.find(eachItem => eachItem.id === product.id)
    if(productObject){
      this.setState(prevState=>({
        cartList: prevState.cartList.map(eachItem=>{
          if(productObject.id === eachItem.id){
            const updateQuantity = eachItem.quantity + product.quantity
            return{...eachItem, quanity:updateQuantity }
          }
          return eachItem
        })
      }))
    }else{
      const updateCart =[...cartList, { ...product, quantity: product.quantity || 1 }]
      this.setState({cartList:updateCart})
    }
  } 
  removeItem=(id)=>{
    const{cartList}=this.state
    const updateListItem = cartList.filter(eachItem=> eachItem.id !== id)
    this.setState({cartList: updateListItem})
  }
  increaseItem = (id) => {
  this.setState(prevState => ({
    cartList: prevState.cartList.map(eachItem => {
      if (id === eachItem.id) {
        return { ...eachItem, quantity: eachItem.quantity + 1 }
      }
      return eachItem
    }),
  }))
  }

  decreaseItem = (id) => {
  const { cartList } = this.state
  const product = cartList.find(eachItem => eachItem.id === id)

  if (product.quantity > 1) {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (id === eachItem.id) {
          return { ...eachItem, quantity: eachItem.quantity - 1 }
        }
        return eachItem
      }),
    }))
  } else {
    this.removeItem(id)
  }
  }

  removeAllCart=()=>{
     this.setState({cartList: []})
  }
   

  render(){
    const{cartList}=this.state
    console.log(cartList)
    return(
      <Context.Provider 
        value={{
          cartList,
           addCartProduct:this.addCartProduct,
          increaseItem:this.increaseItem,
          decreaseItem:this.decreaseItem,
          removeItem:this.removeItem,
          removeAllCart:this.removeAllCart
        }}
      >
        <>
          <BrowserRouter>
            <Routes>
              <Route exact path="/login" element={<Login/>}/>
              <Route exact path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route exact path="/products" element={<Products/>}/>
              <Route exact path="/products/:id" element={<ProductDetails/>}/>
              <Route exact path="/cart" element={<Cart/>}/>
            </Routes>
          </BrowserRouter>
        </>
      </Context.Provider>
      
    )
  }
}
export default App