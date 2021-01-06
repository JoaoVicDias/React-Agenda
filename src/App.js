import React,{Component} from 'react'
import IndexPage from './conteiners/indexPage/indexPage'
import AuthPage from './conteiners/authPage/authPage'
import {Route,Switch,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Logout from './conteiners/authPage/logout/logout'



class App extends Component {

  
  render(){
    return (
      <React.Fragment>
        <Switch>
        {this.props.token ? <Route  path="/logout" exact component={Logout}/> :null}
        <Route  path="/auth" exact component={AuthPage}/>
        <Route  path="/" exact component={IndexPage} />
        <Redirect to="/" />
        </Switch>
      </React.Fragment>
    )  
  }
  
   
}

const  mapStateToProps = state =>{
  return {
    token:state.token
  }
}

export default connect(mapStateToProps)(App);
