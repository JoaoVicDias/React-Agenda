import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import React,{Component} from 'react'
import * as actionsTypes from '../../../store/actions/index'

class Logout extends Component{
    
    componentDidMount(){
         this.props.onLogout()
    }
       
    render(){
        return <Redirect exact to="/"/>
    }
}


const mapStateToProps = state =>{
    return state
}

const mapDispacthToProps = dispacth =>{
    return {
        onLogout:() => dispacth(actionsTypes.logout())
    }
}


export default connect (mapStateToProps,mapDispacthToProps)(Logout)