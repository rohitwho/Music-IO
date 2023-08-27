


import React from "react"
import Logo from "../../assets/logo.png"
import {Link,Input} from "@nextui-org/react"




export default function Footer (){




    return ( <main  style={{

    
        // height:"18vh",
        background:"black",
        width:"100%",
        gap:"10px",
        marginTop:"2%"
        
    
    }} >
        <div style={{
                    display :"flex",
                    justifyContent:"space-around",
                    alignItems:"center",
                    padding:"2%"
                

        }}>
            <div style={{
              display :"flex",
              marginInline:"2%",
              alignItems:"center"
            
            }}>
                 <img  style={{
                        aspectRatio: "1",
                        width: "3rem",
                      }} src={Logo} alt="Music" />  <h1 style={{
            
                    display:"inline-flex",
                    justifyContent:"flex-start",
                alignItems:"flex-start",
                // margin:"2%",
                fontSize:"1.5em"
                }
            
            
            
                }className=" text-white " >MusicIO</h1>
            
            
            </div>
               <div >
               <ul><h1 className=" text-white ">Helpful Links</h1>
                   <li>
                   <Link color="warning">About</Link>
                   </li>
                   <li>
                 <Link color="warning">Contact</Link>
                   </li>
                   <li>
                 <Link color="warning">Providers</Link>
                   </li>
                   <li>
                 <Link color="warning">Api</Link>
                   </li>
              </ul>
               </div>
               <div >
               <ul><h1 className=" text-white " >CREATOR TOOLS</h1>
                   <li>
               <Link color="warning">Music Io for Dev</Link>
                   </li>
                   <li>
                 <Link color="warning">Api Key</Link>
                   </li>
                   <li>
                 <Link color="warning">Auth</Link>
                   </li>
                   <li>
                 <Link color="warning">Home</Link>
                   </li>
              </ul>
               </div>
               <Input
                  type="email"
                  label="Email"
            
                  description="We'll never share your email with anyone else."
                  className="max-w-xs"
                />
        </div>
    </main>)

}