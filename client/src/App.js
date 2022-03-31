import React,{useState,useEffect,useContext} from 'react'
import { useDispatch } from 'react-redux';
import {BrowserRouter as Router, Routes,Route,Navigate, BrowserRouter } from "react-router-dom"

import "./App.css"
import Sidebar from './sidebar';
import Chat from './Chat';


const App = () => {

 
    return (
        <div className='app'>
         <div className='app__body'>
         <Sidebar />
         <Chat />
         </div>
      
  
        </div>
    )
}


export default App
