import { Link } from "react-router-dom";
import withRouter from "../withRouter";
import Cookies from 'js-cookie'
import Context from "../../context/Context"; 
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import "./index.css"

const Header=()=>{

    const navigate = useNavigate()
    const{cartList}= useContext(Context)
    const cartLength = cartList.length
    const onLogout=()=>{
        Cookies.remove('jwt_token');
        navigate('/login', { replace: true })
    }
    return(
        <div className="Header-bg-container">
            <Link to='/'>
                <img className="logo" src='https://static.vecteezy.com/system/resources/previews/020/028/962/non_2x/vsp-letter-logo-design-on-white-background-vsp-creative-circle-letter-logo-concept-vsp-letter-design-vector.jpg'/>
            </Link>
            <div className="header-links-container">
                <Link to='/' className="header-names">
                    Home
                </Link>
                <Link to='/products' className="header-names">
                    Products
                </Link>
                <Link to='/cart'  className="header-names">
                    Cart <span>({cartLength})</span>
                </Link>
                <button className="logout-buttton" onClick={onLogout}>Logout</button>
            </div>
    </div>
    )
}
export default Header