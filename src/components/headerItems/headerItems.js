import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import HeaderItem from './headerItem/headerItem'
import classes from './headerItems.module.css'
import {connect} from 'react-redux'


const HeaderItems = props =>{

    const [responsive,setResponsive] = useState(false)

    const responsiveHeaderHandler = ()=>{
        setResponsive(!responsive)
    }


    const responsiveHeader = (
        <React.Fragment>
            <div onClick={responsiveHeaderHandler} style={{"transform":responsive?"translateX(0)":"translateX(-100vw)"}} className={classes.backdrop}></div>
        <div className={classes.responsive_header} style={{"transform":responsive?"translateX(0)":"translateX(-100vw)"}}>
            <ul className={classes.header__items_responsive}>
                    <HeaderItem ><NavLink activeClassName={classes.active} to='/' exact>Minha agenda</NavLink></HeaderItem>
                    {props.token ?<HeaderItem ><NavLink activeClassName={classes.active} exact to='/logout'>Logout</NavLink></HeaderItem> : <HeaderItem ><NavLink activeClassName={classes.active} to='/auth'>Sign in</NavLink></HeaderItem>}
                </ul>
        </div>
        </React.Fragment>
        
    )

    return(
        <React.Fragment>
            <header className={classes.index__header}>
                <ul className={classes.header__items}>
                    <HeaderItem ><NavLink activeClassName={classes.active} to='/' exact>Minha agenda</NavLink></HeaderItem>
                    {props.token ?<HeaderItem ><NavLink activeClassName={classes.active} exact to='/logout'>Logout</NavLink></HeaderItem> : <HeaderItem ><NavLink activeClassName={classes.active} to='/auth'>Sign in</NavLink></HeaderItem>}
                </ul>
                <div onClick={responsiveHeaderHandler} className={classes.toggle_btn}><span></span>
                          <span></span>
                          <span></span>
                    </div>
            </header>
            {responsiveHeader}
        </React.Fragment>
    )
}

const mapStateToProps = state=>{
    return{
        token:state.token
    }
}

export default connect(mapStateToProps)(HeaderItems )