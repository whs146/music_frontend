import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Grid,
  Link,
  Container,
  Box,
} from "@material-ui/core";
import RoomCreatePage from "./RoomCreatePage";
import { makeStyles } from "@material-ui/styles";
import { useEffect } from "react";
import MusicPlayer from "./MusicPlayer";

const Room = () => {
  // const state={votesToSkip:2,guestCanPause:false,isHost:false}
  const [state, setState] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
    spotifyAuthenticated:false,
    
  });
  const [roomCode, setRoomCode] = useState(useParams().roomCode);
  const navigate = useNavigate();
  const clearRoomCode = () => setRoomCode(null);
  const [settings, showSetting] = useState(false);
  const [song, setSong]=useState({})
  // let interval=null
  
  const getRoomDetails = () => {
    // console.log(state)
     fetch("/api/get-room" + "?code=" + roomCode)
      .then((response) => {
        //clear the room code when leave the room

        if (!response.ok) {
          clearRoomCode();
          navigate("/");
        }
        
        return response.json();
      })
      .then((data) => {
        
        setState({
          // ...state,
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
          spotifyAuthenticated:state.spotifyAuthenticated
        });
        // useEffect(()=>{console.log(state)},[state.votesToSkip])
        // console.log(state)
        

        if(state.isHost){
        authenticateSpotify();
        }
      });

      
  };
  // useEffect(()=>getCurrentSong)
  useEffect(()=>{
    const interval=setInterval(()=>{
      getCurrentSong()
    },1000)
    return ()=>{clearInterval(interval)}
  },[])
  // useEffect(()=>{interval=setInterval(getCurrentSong),1000},[])
  // useEffect(()=>{return clearInterval(interval)})
 const getCurrentSong=()=>{
   fetch("/spotify/current-song").then((response)=>{
     if(!response.ok){
       return {};
     }
     else{
      //  console.log(response)
       return response.json();
     }
   }).then((data)=>{setSong({song:data})})
 }


// function getCurrentSong() {
//   fetch("/spotify/current-song")
//     .then((response) => {
//       if (!response.ok) {
//         return {};
//       } else {
//         console.log(response)
//         return response.json();
        
//       }
//     })
//     .then((data) => {
//       this.setState({ song: data });
//       console.log(data);
//     });
// }
  // console.log(state)
    
  // function getRoomDetails() {
  //   return fetch("/api/get-room" + "?code=" + roomCode)
  //     .then((response) => {
  //       if (!response.ok) {
  //         this.props.leaveRoomCallback();
  //         this.props.history.push("/");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setState({
  //         votesToSkip: data.votes_to_skip,
  //         guestCanPause: data.guest_can_pause,
  //         isHost: data.is_host,
  //       });
  //       if (this.state.isHost) {
  //         this.authenticateSpotify();
  //       }
  //     });
  // }
  useEffect(()=>{getRoomDetails()},[state.isHost])
  // useEffect(()=>{getRoomDetails()},[roomCode])
  // getRoomDetails();
  // console.log(state.isHost+"hh")
  // console.log("ggg")

  // const updateShowSettings = (value) => showSetting({ showSettings: value });
  const updateSettingButton = () => {
    // console.log('updatesettingbutton')
    return (
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => showSetting(true)}
        >
          Settings
        </Button>
      </Grid>
    );
  };
  const leaveButtonPressed = () => {
    // console.log('leaveButtonPressed')
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then((response) => {
      clearRoomCode();
      navigate("/");
    });
  };
  
  // function authenticateSpotify() {
  //   console.log(state);
  //   fetch("/spotify/is-authenticated")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setState({ spotifyAuthenticated: data.status });
  //       console.log(data.status);
  //       if (!data.status) {
  //         fetch("/spotify/get-auth-url")
  //           .then((response) => response.json())
  //           .then((data) => {
  //             window.location.replace(data.url);
  //           });
  //       }
  //     });
  // }
  const authenticateSpotify=()=>{
    // console.log(state)
    // console.log('authenticateSpotify')
     fetch('/spotify/is-authenticated').then((response)=>response.json()).then((data)=>{
      setState({...state,spotifyAuthenticated:data.status,})
      // console.log(state);
      if(!data.status){
        fetch('/spotify/get-auth-url').then((response)=>response.json()).then((data)=>{
          window.location.replace(data.url);
        })
      }
    });
  }
 
  const renderSettings = () => {
    // console.log('renderSettings')
    // classes=useStyles()
    return (
      <div>
        <RoomCreatePage
          update={true}
          votesToSkip={state.votesToSkip}
          guestCanPause={state.guestCanPause}
          roomCode={roomCode}
          updateCallback={getRoomDetails}
         
        />

        <Box align="center" margin={1}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {showSetting(false)}}
          >
            Close
          </Button>
        </Box>
      </div>
    );
  };

  
  // return renderSettings();
  // console.log(state)
  if (settings) {
    // console.log('notseettings')
    return renderSettings();
  }
  return (
    <Container>
      <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="center"
        direction="column"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Code: {roomCode}
          </Typography>
        </Grid>
        {/* <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Votes: {state.votesToSkip}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Guest Can Pause: {state.guestCanPause.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Host: {state.isHost.toString()}
          </Typography>
        </Grid> */}
        {/* only the host can see the setting button */}
        <MusicPlayer {...song} />
        {state.isHost ? updateSettingButton() : null}
        <Grid item xs={12} align="center">
          <Button
            style={{color:'white'}}
            variant="contained"
            color="secondary"
            to="/"
            component={Link}
            onClick={leaveButtonPressed}
            
          >
            Leave Room
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Room;
