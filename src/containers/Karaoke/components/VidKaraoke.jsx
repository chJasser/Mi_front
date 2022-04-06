import React, { useContext } from "react";
import { Grid, Typography, Paper, makeStyles } from "@material-ui/core";

import { SocketContext } from "../Context";

const useStyles = makeStyles((theme) => ({
  //   video: {
  //     width: "550px",
  //     [theme.breakpoints.down("xs")]: {
  //       width: "300px",
  //     },
  //   },
  gridContainer: {
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  paper: {
    padding: "10px",
    border: "2px solid black",
    margin: "10px",
  },
}));

const VideoKaraoke = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);
  const classes = useStyles();

  return (
    <Grid className="">
      {stream && (
        <video
          playsInline
          muted
          ref={myVideo}
          autoPlay
          className={classes.video}
        />
      )}
      {callAccepted && !callEnded && (
        <video playsInline ref={userVideo} autoPlay className="" />
      )}
    </Grid>
  );
};

export default VideoKaraoke;
