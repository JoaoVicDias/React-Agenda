import * as actionsTypes from './actionsTypes'
import Axios from 'axios'

export const authSuccess = (token,userId)=>{
    return{
        type:actionsTypes.AUTH_SUCCESS,
        token:token,
        userId:userId
    }
}

export const authStart = ()=>{
    return{
        type:actionsTypes.AUTH_START
    }
}

export const authLogout = ()=>{
    return{
        type:actionsTypes.AUTH_LOGOUT
    }
}

export const authfailed = ()=>{
    return{
        type:actionsTypes.AUTH_FAILED
    }
}


export const logout = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    return{
        type:actionsTypes.AUTH_LOGOUT
    }
}



export const auth = (login,password,isSignin)=>{
    return dispatch =>{
        dispatch(authStart())
        const authData ={
            email:login,
            password:password,
            returnSecureToken:true
        }
        let url ="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDROzI9EzbXVgqMFlC86PgcJWeY45Xk3hw"
        if(!isSignin){
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDROzI9EzbXVgqMFlC86PgcJWeY45Xk3hw"
        }

        Axios.post(url,authData).then(res=>{
            dispatch(authSuccess(res.data.idToken,res.data.localId))
            localStorage.setItem("token",res.data.idToken)
            localStorage.setItem("userId",res.data.localId)
        }).catch(()=>{
            dispatch(authfailed())
        })
    }
}

export const createAgenda = ()=>{
    return{
        type:actionsTypes.CREATE_AGENDA
    }
}



export const createAgendaSuccess = ()=>{
    return{
        type:actionsTypes.CREATE_AGENDA_SUCCESS
    }
}

