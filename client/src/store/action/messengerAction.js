
import axios from "axios"
import {FRIENDS_GET_SUCCESS ,MESSAGE_GET_SUCCESS,MESSAGE_SEND_SUCCESS} from "../types/messengerType";
const API = axios.create({baseURL:"http://localhost:4000"})



// messenger friends get alls
export const getFriends = () => async(dispatch)=>{
    
    try{
       
        const response = await API.get("/auth/getFriends",{ withCredentials: true })
       
        dispatch({
            type : FRIENDS_GET_SUCCESS,
            payload : {
                friends : response.data
            }
        })
      
       }catch(err){
           console.log(err.response.data)
       }
    


}


export const messageSend = (data) => async(dispatch)=>{

    try {
        const response = await API.post('/messenger/sendMessage',data,{ withCredentials: true });
       
        dispatch({
            type : MESSAGE_SEND_SUCCESS,
            payload : {
                message : response.data.message
            }
        })
    } catch (error) {
        console.log(error.response.data);
    }
}

export const getMessage = (id) =>{
   
    return async(dispatch)=>{
        
        try {
            const response = await API.get(`/messenger/getMessage/${id}`,{ withCredentials: true })
            dispatch({
                type :MESSAGE_GET_SUCCESS,
                payload : {
                    message : response.data.message
                }
            })
        } catch (error) {
            console.log(error.response);
        }
    }
}

export const ImageMessageSend = (data) => async(dispatch)=>{

    try {
        const response = await API.post('/messenger/imageMessageSend',data,{ withCredentials: true });
        if(response.data.success){
            dispatch({
                type : MESSAGE_SEND_SUCCESS,
                payload : {
                    message : response.data.message
                }
            })
            return response.data
        }else{
            return response.data
        }
       

    } catch (error) {
       
        console.log(error.response.data)
       return {success:false,message:"Error"}
       
       
    }
    
}


export const seenMessage = (msg)=>async(dispatch)=>{
    try {
      
        const response = await API.post('/messenger/seenMessage',msg,{ withCredentials: true });
    } catch (error) {
      
        console.log(error.response)
    }
}


export const updateMessage = (msg)=>async(dispatch)=>{
    try {
        const response = await API.post('/messenger/delivaredMessage',msg,{ withCredentials: true });
    } catch (error) {
      
        console.log(error.response)
    }

}