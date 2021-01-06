import React from 'react'
import classes from './buttonForm.module.css'

const buttonForm = props =>{
    return <button  onClick={props.clicked} className={classes.btn_form} disabled={props.disabled}>{props.children}</button>
}





export default buttonForm