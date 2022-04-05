import React, { useContext } from "react";
import { Grid, Typography, Paper, makeStyles } from "@material-ui/core";

import { SocketContext } from "../Context";

const useStyles = makeStyles((theme) => ({
  video: {
    border: "2px solid gray",
    padding: "1rem",
    margin: "1rem",
    borderRadius: "10px",
    width: "550px",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  gridContainer: {
    display: "flex",
    position: "relative",
    justifyContent: "center",

    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  paper: {
    padding: "10px",
    border: "2px solid black",
  },
}));

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);
  const classes = useStyles();

  return (
    <Grid container className={classes.gridContainer}>
      {stream && (
        <Grid>
          <video
            playsInline
            muted
            ref={myVideo}
            autoPlay
            className={classes.video}
          />
        </Grid>
      )}
      {callAccepted && !callEnded && (
        <Grid>
          <video
            playsInline
            ref={userVideo}
            autoPlay
            className={classes.video}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default VideoPlayer;
