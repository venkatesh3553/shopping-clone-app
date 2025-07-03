import Context from "../../context/Context";
import AllCartList from "../AllCartList";
import Header from "../Header";
import "./index.css"
const Cart =()=>(
    <Context.Consumer>
        {value=>{
            const{cartList , removeAllCart}= value
            let amount=0
            cartList.forEach(eachItem=>{
                amount += eachItem.price * eachItem.quantity
            })
            const cartlistIsEmpty = cartList.length ===0
            const cartLength= cartList.length 
                console.log(cartLength)
            return(
                <>
                {cartlistIsEmpty ?(
                     <div className="no-products-container">
                        <Header/>
                        <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
                        alt="no products"
                        className="no-products-img"
                        />
                        <h1 className="no-products-text">No Products Found</h1>
                        <p className="no-products-subtext">You don't add any Product Go and Add</p>
                    </div>
                ):(
                    <>
                        <Header/>
                        <ul className="cart-ul">
                            {cartList.map(eachItem =>(
                                <AllCartList cartList={eachItem} key={eachItem.id}/>
                            ))}
                        </ul>
                        <div className="total-amount-container">
                            <button className="remove-all-button" onClick={removeAllCart}>Romove All</button>
                            <p className="amount"> <span className="amount-span"> Order Price:  </span> {amount}/-</p>
                        </div>
                        <p className="count">Total Products:- <span className="cout-sapn">{cartLength}</span></p>
                        <button className="order-button">Order Now</button>
                    </>
                )}
                    
                </>
            )
        }}
    </Context.Consumer>
)
export default Cart