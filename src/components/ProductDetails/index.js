import { Component } from "react";

import Context from "../../context/Context";
import withRouter from "../withRouter";
import Cookies from 'js-cookie'

import ProductList from "../ProductItemList";
import './index.css'
import Header from "../Header";

const apiStatus={
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}

class ProductDetails extends Component{
    state={productItmeDetails:{} , similorProductData:[] , apiStatusIs:apiStatus.initial}

    componentDidMount(){
        this.getProductDetails()
    }


    getFormattedData = data => ({
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        id: data.id,
        imageUrl: data.image_url,
        price: data.price,
        rating: data.rating,
        title: data.title,
        totalReviews: data.total_reviews,
    })
    getProductDetails=async()=>{
        this.setState({apiStatusIs:apiStatus.inProgress})
        const {id} = this.props.router.params
        const jwtToken = Cookies.get("jwt_token")
        const url = `https://apis.ccbp.in/products/${id}`
        const options={
            headers:{Authorization : `Bearer ${jwtToken}`},
            method:"GET"
        }
        
        try{
            const response = await fetch(url , options)
            const data = await response.json()
            if(response.ok){
                const updateData= this.getFormattedData(data)
                const updateSimilorProductData=data.similar_products.map(
                    eachItem => this.getFormattedData(eachItem)
                )
                this.setState({productItmeDetails : updateData,
                    similorProductData:updateSimilorProductData,
                    apiStatusIs:apiStatus.success
                })
            }else{
                console.log('no')
                this.setState({apiStatusIs:apiStatus.failure})
            }

        }catch{
            console.log('ERROR')
            this.setState({apiStatusIs:apiStatus.failure})
        }
        
    }

     apiFailureView = () => (
        <div className="api-error-view-container">
        <img
            src="https://images.template.net/84921/free-something-went-wrong-illustration-ujbiu.jpg"
            alt="all-products-error"
            className="error-img"
        />
        <button onClick={this.getProduct}>Retry</button>
        </div>
    )
    apiSuccessView=()=>(
        <Context.Consumer>
            {value=>{
                const{addCartProduct}=value
                const{productItmeDetails , similorProductData}=this.state

                const onClickAddProduct=()=>{
                    addCartProduct({...productItmeDetails  })
                }
        return(
        
           <>
            <Header/>
                <div className="product-details-container">
                    <img src={productItmeDetails.imageUrl} alt="product" className="product-image-details" />
                    <div className="product">
                        <h1 className="product-name">{productItmeDetails.title}</h1>
                        <p className="price-details">Rs {productItmeDetails.price}/-</p>
                        <div className="rating-and-reviews-count">
                        <div className="label-value-container">
                            <p className="rating">{productItmeDetails.rating}</p>
                            <img
                            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                            alt="star"
                            className="star"
                            />
                        </div>
                        <p className="reviews-count">{productItmeDetails.totalReviews} Reviews</p>
                        </div>
                        <p className="product-description">{productItmeDetails.description}</p>
                        <div className="label-value-container">
                        <p className="label">Available:</p>
                        <p className="value">{productItmeDetails.availability}</p>
                        </div>
                        <div className="label-value-container">
                        <p className="label">Brand:</p>
                        <p className="value">{productItmeDetails.brand}</p>
                        </div>
                        <hr className="horizontal-line" />
                        <div className="quantity-container">
                        
                        <p className="quantity">{productItmeDetails.quantity}</p>
                        
                        </div>
                        <button
                        type="button"
                        className="button add-to-cart-btn"
                        onClick={onClickAddProduct}
                        >
                        ADD TO CART
                        </button>
                    </div>
                </div>
                <ul className="product-details-ul">
                    {similorProductData.map(eachItem=>(
                        <ProductList list={eachItem} key={eachItem.id}/>
                    ))}
                </ul>
            </>
        )
            }}

        </Context.Consumer>
    )
    apiInProsess=()=>(
        <div className="loader-container">
            <img src="https://cdn.dribbble.com/users/688241/screenshots/10492573/media/e0d38e86b2a8972e060d1ee42e5eb5ed.gif"
            className="lodaing-img"/>
        </div>
    )

    apiResultViwe=()=>{
        const{apiStatusIs}=this.state
        switch(apiStatusIs){
            case apiStatus.inProgress:
                return this.apiInProsess()
            case apiStatus.failure:
                return this.apiFailureView()
            case apiStatus.success:
                return this.apiSuccessView()
            default:
                return null
        }
    }

    render(){
        const{productItmeDetails , similorProductData}=this.state
        // console.log(productItmeDetails , similorProductData)
        return(
            <>
            {this.apiResultViwe()}
            </>
        )
    }
}
export default withRouter(ProductDetails)