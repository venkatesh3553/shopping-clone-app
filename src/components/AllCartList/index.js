import Context from "../../context/Context";
import './index.css'
const AllCartList =(props)=>(
    <Context.Consumer>
         
        {value=>{
            const{increaseItem ,decreaseItem ,removeItem }=value
            const {cartList} = props
            const {id, title, brand,  price, imageUrl , quantity} = cartList
            const increase =()=>{
                increaseItem(id)
            }
            const decrease=()=>{
                decreaseItem(id)
            }
            const remove=()=>{
                removeItem(id)
            }
            return (
                <>
                    
                    <li className="cart-li">                               
                                <div className="cart-product-title-brand-container">
                                     <img className="cart-image" src={imageUrl} alt={title} />                                    
                                     <div className="title-brand-container">
                                        <p className="cart-product-title">{title}</p>
                                        <p className="cart-product-brand">by {brand}</p>
                                        <p className="item-price">{price}/-</p>
                                    <div className="cart-button-container">
                                            <button className="increase" onClick={decrease}> - </button>
                                            <p className="quantity">{quantity}</p>
                                            <button  onClick={ increase} className="dicrease"> + </button>
                                    </div>
                                    </div>                                    
                                </div>                               
                            <button className='remove-button' onClick={remove}>Remove</button>
                    </li>
                </>
            )
        }}

    </Context.Consumer>
)
export default AllCartList