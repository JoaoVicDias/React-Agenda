import React from 'react'
import classes from './indexForm.module.css'
import InputIndexForm from "./inputIndexForm.js/inputIndexForm" 
import LabelIndexForm from './labelIndexForm./labelIndexForm'
import ButtonForm from './buttonForm/buttonForm'
import { connect } from 'react-redux'
import Spinner from '../UI/spinner/spinner'


const IndexForm = props=>{


        let form = props.loading ? <Spinner/> : <React.Fragment>

             <LabelIndexForm>Title</LabelIndexForm> <br/>
                <InputIndexForm type={props.typeText} 
                changed={props.changedText} 
                placeHolder={props.placeHolderText}
                value={props.valueText}
                error={props.validText}
                touch={props.touchText}
                />
                 <LabelIndexForm>Content</LabelIndexForm><br/>
                 <InputIndexForm type={props.typeTextarea}
                    changed={props.changedTextarea}
                    value={props.valueTextarea}
                    error={props.validTextarea}
                    touch={props.touchTextarea}/>
                {props.token ? <ButtonForm clicked={props.clicked} disabled={props.btnDisabled}>Add item</ButtonForm>:<a className={classes.btn__auth} href="/auth">Sign in</a>}
        </React.Fragment>

        return(
            <div className={classes.index__form}>
                <form>
                {form}
                </form> 
            </div>
        )
}

const mapStateToprops = state =>{
    return{
        token:state.token,
        userId:state.userId,
        loading:state.loading
    }
}


export default  connect(mapStateToprops)(IndexForm)