import React,{Component} from 'react'
import classes from './indexPage.module.css'
import HeaderItems from '../../components/headerItems/headerItems'
import IndexForm from '../../components/indexForm/indexForm'
import SearchForm from '../../components/indexSearchForm/searchForm'
import {connect} from 'react-redux'
import YourAgenda from '../../components/yourAgenda/yourAgenda'
import axios from 'axios'
import AgendaItem from '../../components/yourAgenda/agendaItem/agendaItem'
import * as actionsTypes from '../../store/actions/index'



class IndexPage extends Component{
    state = {
        successMsgState:false,
        itensAgenda:[],
        filteredAgenda:[],
        inputItems:{
            inputText:{
                type:"text",
                placeHolder:"Title",
                value:"",
                validation:{
                    required:true,
                    minLength:2
                },
                valid:false,
                touch:false
            },
            textarea:{
                type:"textarea",
                value:"",
                validation:{
                    required:true
                },
                valid:false,
                touch:false
            }
        }
    }


    componentDidMount(){
        this.OnSuccessMsg()
        this.onFecthAgendaItems()
        this.setState({originalitensAgenda:this.state.itensAgenda.concat()})
    }



    checkValidationHandler = (value,rules)=>{
        let isValid = true
        
        if(rules.required){
            isValid = value.trim() !== "" && isValid
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }

        return isValid
    }

    inputIndexFormHandler = (event,name)=>{
        const newInputs = {
            ...this.state.inputItems,
           [name]:{
            ...this.state.inputItems[name],
            value:event.target.value,
            valid:this.checkValidationHandler(event.target.value,this.state.inputItems[name].validation),
            touch:true
           }
        }
        this.setState({inputItems:newInputs})
    }

    formSendHandler = event =>{
        event.preventDefault()
        const newAgenda = {
            title:this.state.inputItems.inputText.value,
            content:this.state.inputItems.textarea.value,
            userId:this.props.userId
        }
       this.onSubmitNewAgenda(newAgenda)
    }
    
    onSubmitNewAgenda = newAgenda =>{
        this.props.onCreateAgenda()
        const newInputs = {
            ...this.state.inputItems,
                inputText:{
                ...this.state.inputItems.inputText,
                value:"",
                touch:false,
                valid:false
            },
            textarea:{
                ...this.state.inputItems.textarea,
                value:"",
                touch:false,
                valid:false
            }
        }
        axios.post("https://react-my-agenda-3037a-default-rtdb.firebaseio.com/agenda.json",newAgenda).then(() =>{
            this.setState({inputItems:newInputs,itensAgenda:this.state.itensAgenda.concat(newAgenda) })
            this.onFecthAgendaItems()
            this.props.onCreateAgendaSuccess()
        })
    }

    onFecthAgendaItems = ()=>{
        const itensAgenda = []
        if(this.props.token){
         const queryParams ='?orderBy="userId"&equalTo="'+ this.props.userId +'"'
         axios.get("https://react-my-agenda-3037a-default-rtdb.firebaseio.com/agenda.json"+queryParams).then(res=>{
             for(let key in res.data){
                 itensAgenda.push({
                    ...res.data[key],
                    key:key
                 })
             }
             this.setState({itensAgenda:itensAgenda})
         })
         }
    }

    OnSuccessMsg = ()=>{
        if(this.props.successMsg){
            this.setState({successMsgState:true})
        }
        if(this.props.token){
            setTimeout(()=>{
                this.setState({successMsgState:false})
            },4000)
        }
    }

    removeAgendaItem = noteId =>{
        const removeItem = this.state.itensAgenda.filter(e=>e.key === noteId)
        
        
        axios.delete(`https://react-my-agenda-3037a-default-rtdb.firebaseio.com/agenda/${removeItem[0].key}.json`).then(res=>{
             this.setState({itensAgenda:this.state.itensAgenda.filter(e=>e.key!==noteId)})
        })
    }

    filterAgenda = (event)=>{
        if(event.target.value === ""){
            this.setState({filteredAgenda:[]})
        }
        if(!this.props.token ) return
        const filteredAgenda = this.state.itensAgenda.filter(e => e.title.toLowerCase() === event.target.value.toLowerCase())
       
       
        if(filteredAgenda.length >= 1){
            this.setState({filteredAgenda:filteredAgenda})
        }
        

    }
   

    render(){   
        
        let i = 1
        let successDiv = <div className={classes.success_msg}>Success</div>
        let btnDisabled = false
        const formArray = []

        for(let key in this.state.inputItems){
            formArray.push({
                config:this.state.inputItems[key]
            })
        }

        formArray.map(e=>{
            if(!e.config.valid){
                btnDisabled = true
            }
            return btnDisabled
        })
        
        return(
            <React.Fragment>
                <HeaderItems/>
                <main>
                    {this.state.successMsgState?successDiv:null}
                    <IndexForm typeText={this.state.inputItems.inputText.type} 
                    changedText={(event)=>this.inputIndexFormHandler(event,"inputText")} 
                    placeHolderText={this.state.inputItems.inputText.placeHolder}
                    valueText={this.state.inputItems.inputText.value}
                    errorText={this.state.inputItems.inputText.valid}
                    touchText={this.state.inputItems.inputText.touch}
                    typeTextarea={this.state.inputItems.textarea.type}
                    changedTextarea={(event)=>this.inputIndexFormHandler(event,"textarea")}
                    valueTextarea={this.state.inputItems.textarea.value}
                    errorTextarea={this.state.inputItems.textarea.valid}
                    touchTextarea={this.state.inputItems.textarea.touch}
                    btnDisabled={btnDisabled}
                    clicked={(event)=>this.formSendHandler(event)}/>
                  
                    <SearchForm valueHandler={(event)=>this.filterAgenda(event)}/>   
                    <YourAgenda>
                        {this.state.filteredAgenda.length >=1 ?this.state.filteredAgenda.map(e=>{
                            
                            return <AgendaItem clicked={this.removeAgendaItem.bind(this,e.key)} key={e.key} title={e.title} content={e.content}/>
                        }) :this.state.itensAgenda.map(e=>{
                            return <AgendaItem clicked={this.removeAgendaItem.bind(this,e.key)} key={e.key+i} title={e.title} content={e.content}/>
                        })}
                    </YourAgenda>
                </main>


            </React.Fragment>
        )
    }
}

const mapStateToProps = state =>{
    return{
        successMsg:state.successMsg,
        userId:state.userId,
        token:state.token,
        loading:state.loading
    }
}

const mapDispacthToProps = dispatch =>{
    return{
        onCreateAgenda:()=>dispatch(actionsTypes.createAgenda()),
        onCreateAgendaSuccess:()=>dispatch(actionsTypes.createAgendaSuccess())
    }
}



export default connect(mapStateToProps,mapDispacthToProps)(IndexPage)