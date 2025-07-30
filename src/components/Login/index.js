import { Component } from "react";
import Cookies from 'js-cookie'

import './index.css'

import withRouter from "../withRouter";

class Login extends Component{
    state={username :'' ,userpass:'' , errorMsg:false}

    onChangeName =(e)=>{
        this.setState({username : e.target.value})
    }
    onChangePass =(e)=>{
        this.setState({userpass : e.target.value})
    }

    onSuccess=(jwtToken)=>{
        Cookies.set('jwt_token', jwtToken, { expires: 7 });
        const {navigate } = this.props.router
        navigate('/', { replace: true })
    }
    onFail=(errorMsg)=>{
        // this.setState({showSubmitError: true, errorMsg})
    }

    submitForm=async(e)=>{
        e.preventDefault()
        const {username, userpass} = this.state
        const userDetails = {username, password:userpass}
        const url = 'https://apis.ccbp.in/login'
        const options = {
        method: 'POST',
        body: JSON.stringify(userDetails),
        }
        try{
            const responce = await fetch(url , options)
            const data = await responce.json()
            if(responce.ok===true){
                this.onSuccess(data.jwt_token)
            }else{
                this.onFail(data.error_msg)
                this.setState({errorMsg:true})
            }
        }catch(error){
            console.log("Login page try catch blocks Error");
            this.setState({errorMsg:true})
        }
        
    }
    render(){
        const{username , userpass , errorMsg}=this.state
        //console.log(userName , userPass)
        return(
            <>
             
            <div className="login-bg-container">
                <img  src="https://img.freepik.com/premium-vector/online-shopping-isometric-icons-set-choosing-paying-goods-websites-stores_9209-7604.jpg"
                    className="loing-img" alt="Image"/>
                    <form className="login-container" onSubmit={this.submitForm}>
                        <div className="input-container">
                            <label htmlFor="userName" className="label-name">User Name</label>
                            <input onChange={this.onChangeName} type="text" id="userName" className="input-box" placeholder="User Nmae" value={username}/>
                        </div>
                        <div className="input-container" >
                            <label htmlFor="userPass" className="label-pass">Password</label>
                            <input onChange={this.onChangePass} type="password" id="userPass" className="input-box" placeholder="Password" value={userpass}/>
                        </div>
                        <button className="login-button" type="submit">Login</button>
                        {errorMsg &&<p className="error">Incorrect details* </p>}
                        <p className="hint">You Trail This Website Use This <br/>
                            USERNAME:rahul , PASSWORD:rahul@2021
                        </p>
                    </form>

            </div>
            </>
        )
    }
}
export default withRouter(Login);


