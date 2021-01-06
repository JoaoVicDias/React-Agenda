import React from 'react'
import classes from './agendaItem.module.css'


const agendaItem = props =>{
    
    return(
       <div onClick={props.clicked}   className={classes.note}>
           <h4>{props.title}</h4>
           <p>{props.content}</p>
       </div>
    )
}


export default agendaItem