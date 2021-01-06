import React from 'react'
import classes from './searchForm.module.css'

const searchForm = props =>{
    return(
        <div className={classes.search__form}>
            <h4 className={classes.search__form__h4}>Filter by Title</h4>
            <input onChange={props.valueHandler}  className={classes.search__form__input} type='text' placeholder="Type here"   />
        </div>
    )
}




export default searchForm