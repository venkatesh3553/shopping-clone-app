import React from "react";
const Context= React.createContext({
    cartList :[],
    addCartProduct:()=>{},
    increaseItem:()=>{},
    decreaseItem:()=>{},
    removeItem:()=>{},
    removeAllCart:()=>{}
})
export default Context