import React from 'react'
import { connect } from 'react-redux'
import classes from './yourAgenda.module.css'


const yourAgenda  = props =>{

 
    return(
        <React.Fragment>
            <div className={classes.title__notes}>
                <h1>Loaded Notes</h1>
                <hr/>
            </div>
            <div className={classes.div__notes}>
               {props.token?props.children:<h4 className={classes.error__login}>Please sign in!</h4>}
            </div>
        </React.Fragment>
    )
}          


const mapStateToProps = state =>{
    return {
        token:state.token
    }
}

export default connect(mapStateToProps)(yourAgenda)