import React,{useState,useEffect,useContext} from 'react'
import { useDispatch } from 'react-redux';
import {BrowserRouter as Router, Routes,Route,Navigate,Switch } from "react-router-dom"

import "./App.css"
import Sidebar from './sidebar';
import Chat from './Chat';
import Login from "./components/Login"
import { AuthContext } from "./components/Context";


const App = () => {

  const {user,ısAuthenticated,setUser,setIsAuthenticated} = useContext(AuthContext)
 
    return (
        <div className='app'>
         <div className='app__body'>

         <Router>
   
   <Routes>
     {ısAuthenticated ? 
     <Route  path="/"  element={<><Sidebar/><Chat/></>} />
    :
    <Route  path="/" element={<Login />} />      
   
    }
       
       
        
         </Routes>
        
         </Router>

        
        
         </div>
      
  
        </div>
    )
}


export default App
