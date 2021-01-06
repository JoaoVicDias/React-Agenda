import * as actionTypes from '../actions/actionsTypes'

const initialState = {
    token:null,
    loading:false,
    userid:null,
    error:false,
    redirect:false,
    successMsg:false

}

const reducer = (state = initialState,action)=>{

    switch(action.type){
        
        case actionTypes.AUTH_START :
            return {
                ...state,
                loading:true,
                successMsg:false,
                error:false
            }

        case actionTypes.AUTH_SUCCESS :
                return {
                    ...state,
                    loading:false,
                    userId:action.userId,
                    token:action.token,
                    successMsg:true,
                    error:false
                } 

        case actionTypes.AUTH_FAILED :
                return {
                    ...state,
                    loading:false,
                    error:true,
                    successMsg:false
                }

        case actionTypes.AUTH_LOGOUT :
                return{
                    ...state,
                    loading:false,
                    token:null,
                    userId:null,
                    successMsg:false
                }

        case actionTypes.CREATE_AGENDA:
            return{
                ...state,
                loading:true
            }

        case actionTypes.CREATE_AGENDA_SUCCESS:
            return{
                ...state,
                loading:false
            }
        
        default: return state
    }
   
}

export default reducer