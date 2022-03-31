
import React,{useState,useRef,useCallback,useContext,useEffect} from 'react'
import styled from "styled-components";
import 'antd/dist/antd.css';
import { GoogleLogin } from "react-google-login";
import FacebookLogin from 'react-facebook-login';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import "./../Login.css"

const Container = styled.div`
display: flex;
flex-direction: column;
width: 100%;
background-color: #D8DBDC;
height: 100vh;
`;

const Header = styled.div`
color: white;
width: 100%;
font-weight: bold;
background-color: #00A783;
padding: 50px 50px 140px;
font-size: 14px;
`;
const CardView = styled.div`
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
padding: 30px 50px;
margin-left: auto;
margin-right: auto;
margin-top: -80px;
background-color: white;
display: flex;
flex-direction: row;
justify-content: space-evenly;
gap: 40px;
flex-wrap: wrap;
`;

const Instructions = styled.div`
padding: 20px;
font-size: 16px;
ol {
  margin: 40px 0;
}
li {
  margin: 15px 0;
}
`;

const Heading = styled.span`
font-size: 24px;
color: #525252;
`;

const Phone = styled.div`
width: 264px;
height: 264px;
background-color: white;

`;

const PhoneImg = styled.img`
width: 164px;
height: 164px;
background-color: white;


`;


const Login =  ()=>{

  return (
    <>
    
        <Container>
          <Header>
        <WhatsAppIcon />
            Let's Chat 
            </Header>
          <CardView>
            <Instructions>
              <Heading>To use WhatsApp on your computer:</Heading>
              <ol>
                <li>You need to Signin using your Social media Account or phone number.</li>
                <li>You can anytime logout from the Web.</li>
                <li>
                  Click on Signin button to continue using the Whatsapp Clone.
                </li>
              </ol>
              <div className='login__type'> 

              <GoogleLogin
                clientId="412954107899-68euuaorrd8rvs138sa74g0fhudesc2f.apps.googleusercontent.com"
                buttonText="Sign In with Google"
                cookiePolicy={"single_host_origin"}
               
              />

    
               </div>
              
             
            <PhoneInput
           country={'tr'}
  
                />
               <div className='phoneSend'>
              <Button  color="success" size='small' variant="contained" endIcon={< WhatsAppIcon />}>
              LogIn
          </Button>
         
          </div>
            </Instructions>
              
             
               

            <div className=''>
            <PhoneImg  src='https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg' />
            </div>
           
          
          </CardView>
          
        </Container>
     
    </>
  );

}

export default Login





    