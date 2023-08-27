import React,{useState} from 'react'
import Lottie from "lottie-react"
import HeroAnimation from "../Animations-formIcons/Hero.json"
import {Link} from "react-router-dom"

import ReactTyped from "react-typed";
import Auth from "../../utils/auth"
import LogIn from "../Login/loginForm"








function Hero() {





  
  return (
    <div style={{display:"flex" ,justifyContent:"space-around",alignItems:"center",height:"100vh"}}>
        <main style={{width:"40%",border:"1px solid white",padding:"2rem", borderRadius:"10px",color:"white"}}>
            <h1 style={{fontSize:"2rem"}}>Welcome to <strong>Music Io</strong><br></br>One Stop Shop For {""}
            <ReactTyped strings={["Music ","Chat",]} typeSpeed={200} backSpeed={150}loop />
           </h1>
           <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, dolor.</p>
      
            <div style={{margin:"1rem"}}>
              <Link  style={{
                border:"1px solid yellow",
                padding:"1%",
                borderRadius:"10px",
                cursor:"pointer",
                margin:"1rem"
              }}  to = "/chatbox">Start Exploring</Link>
            </div>
        </main>
      <div style={{width:"50%",overflow:"hidden"}}>
          <Lottie animationData={HeroAnimation}> </Lottie>
      </div>

      
    
    </div>
  )
}

export default Hero
