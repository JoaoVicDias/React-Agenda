import React,{Component} from 'react'
import HeaderItems from '../../components/headerItems/headerItems'
import AuthForm from '../../components/authForm/authForm'


class AuthPage extends Component{


    render(){
        return(
            <React.Fragment>
                <HeaderItems/>
                <main>
                    <AuthForm/>
                </main>
            </React.Fragment>
        )
    }
}


export default AuthPage