



const initialState = {
    posts:[],
    currentPost:null
}


const postReducer = (state = initialState,action)=>{
    switch (action.type) {
       
    default:
        return {
            ...state
        }
            
        
        break;
}
}

export default postReducer