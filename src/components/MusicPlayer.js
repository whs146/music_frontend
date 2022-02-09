import React from "react";
import{Grid, Typography,Card,IconButton,LinearProgress} from "@material-ui/core"
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import Plyer from "./Plyer";

const MusicPlayer=(prop)=>{
    const props={...prop.song}
   
    const songProgress=props.time/props.duration*100
    const pauseSong=()=>{
        const requestOptions={
            method:'PUT',
            headers:{'Content-Type':'application/json'},

        }
        fetch('/spotify/pause-song',requestOptions)
    }

    const playSong=()=>{
        const requestOptions={
            method:'PUT',
            headers:{'Content-Type':'application/json'},

        }
        fetch('/spotify/play-song',requestOptions)
    }
    const skipSong=()=>{
        const requestOptions={
            method:'POST',
            headers:{'Content-Type':'application/json'}
        }
        fetch('/spotify/skip-song',requestOptions)
    }

    
  
    
    return(
        <Card>
            <Grid container alignItems="center">
                <Grid item align="center" xs={4}>
                    <img src={props.image_url} height="100%" width="100%" />
                    < Plyer {...prop}/>
                </Grid>
                <Grid item align="center" xs={8}>
                    <Typography component="h5" variant="h5">
                        {props.title}
                    </Typography>
                    <Typography color="textSecondary" variant="subtitle1">
                        {props.artist}
                    </Typography>
                    <div>
                        <IconButton onClick={()=>{props.is_playing?pauseSong():playSong()}}>
                            {props.is_playing?<PauseIcon />:<PlayArrowIcon />}
                        </IconButton>
                        <IconButton onClick={()=>skipSong()}>
                            {props.votes}/{props.votes_required}
                            <SkipNextIcon/>
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
            <LinearProgress variant="determinate" value={songProgress} />
        </Card>
    )
}

export default MusicPlayer