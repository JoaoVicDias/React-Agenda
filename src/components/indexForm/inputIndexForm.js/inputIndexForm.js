import React from 'react'
import classes from './inputIndexForm.module.css'



const inputIndexForm = props =>{

    const inputClasses = [classes.input__form]
    const textareaClasses = [classes.textarea_form]

    if(props.error === false && props.touch){
        inputClasses.push(classes.input__form__error) 
        textareaClasses.push(classes.textarea_form__error)
    }
    

    switch(props.type){
        case "text" :
            return <input onChange={props.changed} value={props.value} className={inputClasses.join(' ')} type="text" name="text" autoComplete="current-text" placeholder={props.placeHolder}/>
        
        case "email":
            return <input onChange={props.changed} value={props.value} className={inputClasses.join(' ')} type="email" name="email" autoComplete="current-email" placeholder={props.placeHolder}/>

        case "password":
            return <input onChange={props.changed} value={props.value} className={inputClasses.join(' ')} type="password" autoComplete="current-password" placeholder={props.placeHolder}/>

        case "textarea":
            return <textarea onChange={props.changed} className={textareaClasses.join(" ")} value={props.value}></textarea>

        default:
            return

    }


}


export default inputIndexForm