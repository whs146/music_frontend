import React, { Component, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";


import {
  Button,
  Grid,
  FormHelperText,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  TextField,
  Container,
  Box,
} from "@material-ui/core";
import Room from "./Room";
import axios from "axios";
// const defaultVotes = 2;

const RoomCreatePage = ({update=false,roomCode=null,votesToSkip=2,guestCanPause=true,updateCallback=()=>{}}) => {

  
const defaultProps={
  votes_to_skip:2,
  guest_can_pause:true,
  update:false,
  roomCode:null,
  updateCallBack:()=>{},

}
  const [guest_can_pause, setGuestCanPause] = useState({guestCanPause}.guestCanPause);
  const [votes_to_skip, setVotesToSkip] = useState({votesToSkip}.votesToSkip);
  const [is_update,setUpdate]=useState({update}.update)
  // const state = { guest_can_pause, votes_to_skip };
 
  //only use hooks at the top level
  const navigate = useNavigate();
  const createButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json","Content-Length":"58" },
      body: JSON.stringify({
        votes_to_skip:votes_to_skip,
        guest_can_pause:guest_can_pause,
      }),
    };
    
    //send a request to the local host with requestOptions, take the response and convert it to json,
    // fetch("/api/create-room"
    axios.put('https://pppsd.herokuapp.com/api/create-room'
    , requestOptions)
      .then((response) => response.json())
      .then((data) => navigate("https://pppsd.herokuapp.com/room/" + data.code));
  };
  const updateButtonPressed=()=>{
    console.log({roomCode})
    console.log({votesToSkip})
    console.log({guestCanPause})
    console.log({updateCallback})
    
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip:votes_to_skip,
        guest_can_pause:guest_can_pause,
        code:roomCode
      }),
    };
    //send a request to the local host with requestOptions, take the response and convert it to json,
    // fetch("/api/update-room"
    axios.patch('https://pppsd.herokuapp.com/api/update-room'
    , requestOptions)
      .then((response) => {
        if(response.ok){
            alert("Update successfully")
        }
        else{
          alert("Update failed")
        }
        
        window.location.reload();
        
        updateCallback()
      })
      
  };

  const renderCreatBtns=()=>{
    return(
      <Grid container
      spacing={1}
      alignItems="center"
      justifyContent="flex-end"
      direction="column">
      <Grid item xs={12}>
      <Button
        color="secondary"
        variant="contained"
        onClick={createButtonPressed}
      >
        Create A Room
      </Button>
    </Grid>

    <Grid item xs={12}>
      <Button color="primary" variant="contained" to="/" component={Link}>
        Back
      </Button>
    </Grid>
    </Grid>


    )
  }

  const renderUpdateBtns=()=>{
    return(
      <Grid item xs={12}>
      <Button
        color="secondary"
        variant="contained"
        onClick={updateButtonPressed}
      >
        Update A Room
      </Button>
    </Grid>

    )
  }
  const title=is_update?"Update a room":"Create a room"
  
  return (
    
    <Box>
      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent="flex-end"
        direction="column"
        style={{ minHeight: "60vh", minWidth: "100vw" }}
      >
        {/* make the grid as wide as possible */}
        <Grid item xs={12}>
          <Typography component="h4" variant="h4">
            {title}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Guest Control of Playback State</div>
            </FormHelperText>
            <RadioGroup
              row
              defaultValue={guest_can_pause.toString()}
              onChange={(e) => setGuestCanPause(e.target.value)}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
              />

              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No Control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl>
            <TextField
              required
              type="number"
              defaultValue={votes_to_skip}
              onChange={(e) => setVotesToSkip(e.target.value)}
              inputProps={{
                min: 1,
                style: { textAlign: "center" },
              }}
            />
            <FormHelperText>
              <div align="center">Votes Required to Skip Song</div>
            </FormHelperText>
          </FormControl>
        </Grid>

         {is_update?renderUpdateBtns():renderCreatBtns()}
      </Grid>
     
    </Box>
  );
};


export default RoomCreatePage;
