import { Link } from 'react-router-dom'
import './index.css'

const ProductList=(props)=>{
    const{list} =props
    const {id ,title , brand,price , imageUrl , rating }=list
    return(
        <li className="product-list-container">
            <Link to={`/products/${id}`} className='link-item'>
                <img src={imageUrl} alt={title} className='product-img'/>
                <p className='title'>{title}</p>
                <p className='brand'>Brand:-{brand}</p>
                <p className='rating'>Rating:-{rating}</p>
                <p className='price'>RS:-{price}</p>
                
            </Link>
        </li>
    )
}
export default ProductList