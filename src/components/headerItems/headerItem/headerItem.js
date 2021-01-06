import React from 'react'   
import classes from './headerItem.module.css'


const headerItem = props => {
    

    return  <li className={classes.header__item}>{props.children}</li> 

}


export default headerItem 