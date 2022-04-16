import React,{useState,useEffect,useContext} from 'react'
import { useDispatch } from 'react-redux';
import {BrowserRouter as Router, Routes,Route,Navigate,Switch } from "react-router-dom"

import "./App.css"
import Sidebar from './sidebar';

import Login from "./components/Login"

import { AuthContext } from "./components/Context";
import { makeStyles } from '@material-ui/core/styles'

import {
    CssBaseline,
    Container,
    Grid,
} from "@material-ui/core"


const useStyle = makeStyles((theme) => ({
  root:{
      flexGrow:0,

  },
  menuButton:{
      marginRight:theme.spacing(0)

  },
  title:{
      flexGrow:0,
      
  },
  container:{
marginTop:theme.spacing(0)
  }
}))

const App = () => {

  const {user,ısAuthenticated,setUser,setIsAuthenticated} = useContext(AuthContext)
  const classes = useStyle();
    return (
   
  

<Grid container className={classes.container}>
  

        <div className='app'>
         <div className='app__body'>

         <Router>
   
   <Routes>
   <Route  path="/"  element={ısAuthenticated?<Navigate to="/Chat"/>:<Login/>}/>
     <Route  path="/Chat" element={ısAuthenticated?<Sidebar/>  : <Navigate to="/"/>}/>      
    </Routes>
        
     </Router>

         </div>
      
  
        </div>

        </Grid>


    )
}


export default App
