import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import { useCallback } from "react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";



const Plyer = (props) => {
    // console.log(props)
    // const [token, setToken] = useState("");
    let token=""
    

  useEffect(() => {
    // console.log(token)
    
    async function getToken() {
      const response = await fetch('/spotify/get-key');
      const json = await response.json();
      // console.log(json)
      token=json
      // setToken(json);
    }

    getToken();

  }, []);

//         const[key,setKey]=useState[""]
//     const getKey=()=>{
//         fetch("/spotify/get-key").then((response)=>{
//           if(!response.ok){
//             return {};
//           }
//           else{
//            //  console.log(response)
//            console.log(response.json())
//             setKey(response.json().token);
//           }
//         })
//       }
  

// useEffect(()=>{getKey,[]})



   

    const AUTH_TOKEN = token
    console.log(AUTH_TOKEN)
  const getOAuthToken = useCallback(callback => callback(token), []);

  return (
    <WebPlaybackSDK
      deviceName="My awesome Spotify app"
      getOAuthToken={getOAuthToken}
      volume={1}>
      {/* `TogglePlay` and `SongTitle` will be defined later. */}
      {/* <TogglePlay /> */}
      {/* <SongTitle /> */}
    </WebPlaybackSDK>
  );
};

export default Plyer