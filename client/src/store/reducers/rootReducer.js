import { combineReducers } from "redux";
import {messengerReducer} from "./messengerReducer"


 const rootReducer = combineReducers({
    messenger:messengerReducer,

})

export default rootReducer
