


import React from "react"
import {Button} from "@nextui-org/react"
import  AuthUtils from ".././auth"


const Auth= "https://accounts.spotify.com/authorize?client_id=bdd9da03ae0b4e068945d124833236e3&response_type=code&redirect_uri=http://localhost:5173/chatbox&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"


export default function spotifyInit(){


return (


    <div style={{
        display:"flex",
        justifyContent:"center",
      
    }}>










<Button >
    <a href={Auth}>Connect with Music IO?</a>
</Button>


    
    
    
    
    
    </div>
)




}







// AQC50W_5AB8mZiFEgPODOkekUjGf4xH7Tb5MYmJHo2ulhwjubOmQrY-FomcmWAr9K2AETcstkyZSnFY_Cqc9zTFfuyxtHvuwgklDB2sXbFU39DjZZXO67Zzf7WN_WR7OLpRvHKwqJ1E5LfFOf7FcxcRf4IQNX7USfm8Z3B3N4peQt8blFUUquwx_sd0UOw-4SrNM_QEF35m05-HBPw
























// function fetchAccessToken(){




//     const clientID ="bdd9da03ae0b4e068945d124833236e3";
//     const redirectUri = 'http://localhost:5173/spotify'
    
//     router. get("/ ",(req,res)=>{
    
    
       
//         var scope = 'user-read-private user-read-email';
      
//         res.redirect('https://accounts.spotify.com/authorize?' +
//           querystring.stringify({
//             response_type: 'code',
//             client_id: clientID,
//             scope: scope,
//             redirect_uri: redirectUri,
           
//           }));
    
    
    
    
//     })
// }


// module.exports = fetchAccessToken