import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '2.7em'
  },
}));

export default function SongLength({ string }) {
  const classes = useStyles();

  return (
      <div className={classes.container}>
        <span>{string[3]}</span>
        <span>{string[4]}</span>
        <span>{string[5]}</span>
        <span>{string[6]}</span>
        <span>{string[7]}</span>
        <span>{string[8]}</span>
      </div>
  );
}
