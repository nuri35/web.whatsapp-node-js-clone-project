import React,{useState,useEffect,useContext} from 'react'
import { useDispatch } from 'react-redux';
import {BrowserRouter as Router, Routes,Route,Navigate,Switch } from "react-router-dom"

import "./App.css"
import Sidebar from './sidebar';
import Chat from './Chat';
import Login from "./components/Login"



const App = () => {

  let auth = true
 
    return (
        <div className='app'>
         <div className='app__body'>

         <Router>
   
   <Routes>
     {auth ? 
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
