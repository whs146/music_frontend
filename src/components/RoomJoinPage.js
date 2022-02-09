import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { Link,useNavigate } from "react-router-dom";

const RoomJoinPage = () => {
  const [state, setState] = useState({
    roomCode: "",
    error: "",
  });
  let navigate=useNavigate();
  const submitButton=()=>{
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: state.roomCode
        }),
      };
      fetch('/api/join-room',requestOptions).then((response)=>{
          if (response.ok){
             navigate(`/room/${state.roomCode}`)
          }
          else{
              setState({
                  error:"Room not found"
              })
          }
      }).catch((error)=>console.log(error))
  }
  return (
    <Container>
      <Grid
        container
        spacing={1}
        alignItems="center"
        justify="center"
        direction="column"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" component="h4">
            Join a Room
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            error={state.error}
            label="Code"
            placeholder="Enter a Room Code"
            value={state.roomCode}
            helperText={state.error}
            variant="outlined"
            onChange={(e)=>setState({
                roomCode: e.target.value
            })}
          />
        </Grid>
        <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={submitButton}>Enter Room</Button>
        </Grid>
        <Grid item xs={12}>
            <Button variant="contained" color="secondary" to="/" component={Link}>Back</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RoomJoinPage;
