import React,{Component} from 'react'
import InputForm from '../indexForm/inputIndexForm.js/inputIndexForm'
import LabelForm from '../indexForm/labelIndexForm./labelIndexForm'
import classes from './authForm.module.css'
import ButtonForm from '../indexForm/buttonForm/buttonForm'
import {connect} from 'react-redux'
import * as actionsTypes from '../../store/actions/index'
import Spinner from '../UI/spinner/spinner'
import {Redirect} from 'react-router-dom'


class AuthForm extends Component{
    
    state = {
        inputs:{
            email:{
                type:"email",
                placeHolder:"xxxxx@xxx.com",
                value:"",
                valid:false,
                validation:{
                    required:true,
                },
                touched:false
            },
            password:{
                type:"password",
                placeHolder:"******",
                value:"",
                valid:false,
                validation:{
                    required:true,
                    minLength:4,
                    maxLength:15
                },
                touched:false
            }
        },
        isSignin:true
    }
    

    inputHandler = (event,inputName)=>{
        const updatedState = {
           ...this.state.inputs,
           [inputName]:{
               ...this.state.inputs[inputName],
               value:event.target.value,
               valid:this.checkValidationHandler(event.target.value,this.state.inputs[inputName].validation),
               touched:true
           }
        }
        this.setState({
            inputs:updatedState
            })       
    }   

    checkValidationHandler = (value,rules) => {
        let isValid = true

        if(rules.required){
            isValid  = value.trim() !== "" && isValid
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid
    }

    switchHandlerSign = (event) =>{
        event.preventDefault()
        this.setState(prevstate=>{
          return{
            isSignin:!prevstate.isSignin
          }  
        })
    }
    formHandle = (event)=>{
        event.preventDefault()
        this.props.onAuth(this.state.inputs.email.value,this.state.inputs.password.value,this.state.isSignin)
    }

   
    render(){

        const arrayForm = []
        let disabledBtn = false
        
        for(let key in this.state.inputs){
            arrayForm.push({
                config:this.state.inputs[key]
            })
        }
        arrayForm.map(e=>{
            if(e.config.valid === false){
                 disabledBtn = true
            }
            return  disabledBtn
        })
        let redirect = this.props.token? <Redirect to='/'/>:null
       

        let form  = this.props.loading ?<Spinner/> :(<React.Fragment>
             <LabelForm>Login</LabelForm><br/>
            <InputForm type={this.state.inputs.email.type} 
            value={this.state.inputs.email.value} 
            changed={(event)=>this.inputHandler(event,"email")}
            placeHolder={this.state.inputs.email.placeHolder}
            error={this.state.inputs.email.valid}
            touch={this.state.inputs.email.touched}/>

            <LabelForm>Password</LabelForm><br/>
            <InputForm type={this.state.inputs.password.type} 
            value={this.state.inputs.password.value}
            changed={(event)=>this.inputHandler(event,"password")}
            placeHolder={this.state.inputs.password.placeHolder}
            error={this.state.inputs.password.valid}
            touch={this.state.inputs.password.touched}/>
            
            <ButtonForm clicked={(event)=>this.formHandle(event)} disabled={disabledBtn}>{this.state.isSignin?"Sign in":"Sign up"}</ButtonForm><br/>
            <button className={classes.switch__button} 
            onClick={(event)=>this.switchHandlerSign(event)}>Switch to {this.state.isSignin ? "Sign up":"Sign in"}</button>
        </React.Fragment>
           )
        return (
            <React.Fragment>   
                {redirect}
                <form className={classes.auth__form}>
                {this.props.error ? <div className={classes.error__msg}>E-mail or password invalid!</div> : null}
                {this.state.isSignin?<h2>Sign in</h2>:<h2>Sign up</h2>}
                {form}
                </form>
                
            </React.Fragment>
        )
    }
}

const mapStateToProps = state =>{
    return{
        loading:state.loading,
        token:state.token,
        error:state.error
    }
}

const mapDispacthToProps = dispatch =>{
    return{
        onAuth:(email,password,isSignin) => dispatch(actionsTypes.auth(email,password,isSignin))
    }
}

export default connect(mapStateToProps,mapDispacthToProps)(AuthForm)