import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';


const Player = (props) => {
  
  //   const[key,setKey]=useState[null]
  //   const getKey=()=>{
  //       fetch("/spotify/get-key").then((response)=>{
  //         if(!response.ok){
  //           return {};
  //         }
  //         else{
  //          //  console.log(response)
  //           return response.json();
  //         }
  //       }).then((data)=>{setKey(data)})
  //     }
  // getKey()
  //   // console.log(key)
    
  //   
//   const [player, setPlayer] = useState(undefined);
//   useEffect(() => {
    
//     const script = document.createElement("script");
//     script.src = "https://sdk.scdn.co/spotify-player.js";
//     script.async = true;

//     document.body.appendChild(script);

//     window.onSpotifyWebPlaybackSDKReady = () => {

//         const player = new window.Spotify.Player({
//             name: 'Web Playback SDK',
//             getOAuthToken: cb => { cb(BQDr9nJBfRSLmUgwZpHXvW094ifjmByle3auJQbX3S8mvW4JsKrV8m_b8TckW2dBT_ftLEOqtiwm-tMnnHBdKNdMPhyzoh9xrlZFWvKYAAbL7cEAxuWhHzKbmrFYKDTEhsLi_QZ5XszLYZikGDZww0jOsRHZ2xVuWwszOgSjg5JaHw_gWyvSodTn); },
//             volume: 0.5
//         });

//         setPlayer(player);
        
//         player.addListener('ready', ({ device_id }) => {
//             console.log('Ready with Device ID', device_id);
//         });

//         player.addListener('not_ready', ({ device_id }) => {
//             console.log('Device ID has gone offline', device_id);
//         });

//         player.addListener('player_state_changed', ( state => {

//             if (!state) {
//                 return;
//             }

//             setTrack(state.track_window.current_track);
//             setPaused(state.paused);

//             player.getCurrentState().then( state => { 
//                 (!state)? setActive(false) : setActive(true) 
//             });

//         }));

//         player.connect();

//     };
// }, []);


   return (
      <>
        <div className="container">
           <div className="main-wrapper">
           <SpotifyPlayer
           syncExternalDevice={true}
           syncExternalDeviceInterval={0}
  token={BQDr9nJBfRSLmUgwZpHXvW094ifjmByle3auJQbX3S8mvW4JsKrV8m_b8TckW2dBT_ftLEOqtiwm-tMnnHBdKNdMPhyzoh9xrlZFWvKYAAbL7cEAxuWhHzKbmrFYKDTEhsLi_QZ5XszLYZikGDZww0jOsRHZ2xVuWwszOgSjg5JaHw_gWyvSodTn}
  
/>;

            </div>
        </div>
      </>
    );
}

export default Player