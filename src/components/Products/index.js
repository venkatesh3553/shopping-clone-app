import { Component } from "react";
import Cookies from 'js-cookie'


import ProductList from "../ProductItemList";
import Header from "../Header";
import Filter from "../Filter";
import "./index.css"

const apiStatus={
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}

const sortbyMoneyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]
const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]
const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class Products extends Component{
    state={list:[] , apiStatusIs:apiStatus.initial,
        userInput:"",
        categoryId:'' ,
        sortByMoneyId:'PRICE_HIGH',
        ratingIdIs:''
    }

    componentDidMount(){
        this.getProduct()
    }

    onChangeInput=(e)=>{
        this.setState({userInput:e.target.value})
    }
    onClickCategory = categoryId => {
        this.setState({ categoryId }, this.getProduct)
    }
    onChangeMoneyId=(e)=>{
        this.setState({sortByMoneyId:e.target.value},this.getProduct)
    }
    onChangeRating=(ratingId)=>{
        this.setState({ ratingIdIs: ratingId }, this.getProduct)
    }
    
    getProduct=async()=>{
        this.setState({apiStatusIs : apiStatus.inProgress})
        const{userInput , categoryId , sortByMoneyId , ratingIdIs}=this.state

        const url=`https://apis.ccbp.in/products?title_search=${userInput}&category=${categoryId}&sort_by=${sortByMoneyId}&rating=${ratingIdIs}`
        const jwtToken = Cookies.get("jwt_token")
        const options={
            headers:{
                    Authorization: `Bearer ${jwtToken}`
            },
            method:'GET'
        }
        try{
            const response= await fetch(url , options)
            
            if(response.ok){
                const data = await response.json()
                const updateList =data.products.map(eachItem =>({
                    title: eachItem.title,
                    brand: eachItem.brand,
                    price: eachItem.price,
                    id: eachItem.id,
                    imageUrl: eachItem.image_url,
                    rating: eachItem.rating,
                }))
                this.setState({list:updateList , 
                    apiStatusIs:apiStatus.success} )
            }else{
                 console.log("dataa Error")
                 this.setState({ 
                    apiStatusIs:apiStatus.failure} )
            }

        }catch{
            console.log("dataa ErrorIS")
            this.setState({ 
                apiStatusIs:apiStatus.failure} )
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

    // apiSuccessView=()=>{
    // const{list , userInput,sortByMoneyId }=this.state
    // const filterSearch = list.filter(eachItem =>
    // eachItem.title.toLowerCase().includes(userInput.toLowerCase())
    // )
    
    // return(
    //         <>
           
    //         <Header/>     
    //         <div className="all-filter-container">
    //             <input type="search" className="inputbox" 
    //             onChange={this.onChangeInput}
    //             placeholder="Search"
    //             value={userInput}/>  
    //             <ul className="filter-ul">
    //                 <h1 className="categoryhead">Category</h1>
    //                 {categoryOptions.map(eachItm=>(
    //                     <Filter categoryOptions={eachItm} key={eachItm.categoryId}
    //                     onClickCategory={this.onClickCategory}
    //                     selectedCategoryId={this.state.categoryId}
    //                     />
    //                 ))}
    //             </ul>
    //                 <h1 className="categoryhead">Rating</h1>
    //             {ratingsList.map(eachItem=>{
    //                  const isActive = eachItem.ratingId === this.state.ratingIdIs
    //                 const ratingBtnClass = isActive ? 'rating-button active' : 'rating-button'
    //                 return(
    //                 <button 
    //                     onClick={() => this.onChangeRating(eachItem.ratingId) }
    //                     key={eachItem.ratingId} className="rating-button">  
    //                     <img className={ratingBtnClass} src={eachItem.imageUrl} alt='img'/>  </button> 
    //                 )
    //             })}
    //             <h1 className="categoryhead">Sort by</h1>
    //             <select 
    //             value={sortByMoneyId}
    //             onChange={this.onChangeMoneyId}
    //             className="sort-option"
    //             >
    //                     {sortbyMoneyOptions.map(eachItem=>(
    //                         <option value={eachItem.optionId} key={eachItem.optionId}>
    //                         {eachItem.displayText}
    //                         </option>
    //                     ))}                    
    //             </select>
    //          </div>
    //         <div>
    //             <ul className="product-ul">
    //                 {filterSearch.map(eachItem =>(
    //                     <ProductList list={eachItem} key={eachItem.id} />
    //                 ))}
    //             </ul>
    //         </div>
    //         </>
    //     )
    // }
    apiSuccessView = () => {
  const { list, userInput, sortByMoneyId } = this.state
  const filterSearch = list.filter(eachItem =>
    eachItem.title.toLowerCase().includes(userInput.toLowerCase())
  )
  const searchIsEmpty = filterSearch.length === 0

  return (
    <>
      <Header />
      <div className="all-filter-container">
        <input
          type="search"
          className="inputbox"
          onChange={this.onChangeInput}
          placeholder="Search"
          value={userInput}
        />
        <ul className="filter-ul">
          <h1 className="categoryhead">Category</h1>
          {categoryOptions.map(eachItem => (
            <Filter
              categoryOptions={eachItem}
              key={eachItem.categoryId}
              onClickCategory={this.onClickCategory}
              selectedCategoryId={this.state.categoryId}
            />
          ))}
        </ul>

        <h1 className="categoryhead">Rating</h1>
        {ratingsList.map(eachItem => {
          const isActive = eachItem.ratingId === this.state.ratingIdIs
          const ratingBtnClass = isActive ? 'rating-button active' : 'rating-button'
          return (
            <button
              onClick={() => this.onChangeRating(eachItem.ratingId)}
              key={eachItem.ratingId}
              className="rating-button"
            >
              <img
                className={ratingBtnClass}
                src={eachItem.imageUrl}
                alt={`Rating ${eachItem.ratingId} stars`}
              />
            </button>
          )
        })}

        <h1 className="categoryhead">Sort by</h1>
        <select
          value={sortByMoneyId}
          onChange={this.onChangeMoneyId}
          className="sort-option"
        >
          {sortbyMoneyOptions.map(eachItem => (
            <option value={eachItem.optionId} key={eachItem.optionId}>
              {eachItem.displayText}
            </option>
          ))}
        </select>
      </div>

      <div>
        {searchIsEmpty ? (
          <div className="no-products-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
              alt="no products"
              className="no-products-img"
            />
            <h1 className="no-products-text">No Products Found</h1>
            <p className="no-products-subtext">Try different search keywords or remove filters</p>
          </div>
        ) : (
          <ul className="product-ul">
            {filterSearch.map(eachItem => (
              <ProductList list={eachItem} key={eachItem.id} />
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

    apiInProsess=()=>(
        <div className="loader-container">
            <img  src="https://cdn.dribbble.com/users/688241/screenshots/10492573/media/e0d38e86b2a8972e060d1ee42e5eb5ed.gif"
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
        return(
            <>
                {this.apiResultViwe()}
            </>
        )
    }
}
export default Products