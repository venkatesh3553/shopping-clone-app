import './index.css'
const Filter=(props)=>{
    const{categoryOptions , onClickCategory , selectedCategoryId}=props
    const{name  ,categoryId }=categoryOptions
    const onClickCategoryIs=()=>{
        onClickCategory(categoryId)
    }
    const isOk =selectedCategoryId === categoryId
    const idSelectForStyle = isOk ? 'selectId':"notSelectId"
    return(
        <li className='filter-li' >
        <button className='filter-button' onClick={onClickCategoryIs}>
           <span className={idSelectForStyle}> {name} </span>
            </button>
        </li>
    )
}
export default Filter