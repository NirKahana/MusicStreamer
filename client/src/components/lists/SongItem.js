import React, { useState } from "react";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SongLength from "./SongLength";

const useStyles = makeStyles({
  alignCenter: {
    display: 'flex',
    alignItems: 'center'
  },
  sideMargin: {
    margin: '0 0.5em'
  }
});

export default function SongItem({ path = false, song, index, tappedItemIndex, setTappedItemIndex }) {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:650px)');
  const [isHovered, setIsHovered] = useState(false);
  return (
    <li
      style={
        path === song.id.toString() ? { backgroundColor: "rgb(22,22,22)" } : {}
      }
      onMouseEnter={() => {setIsHovered(true)}}
      onMouseLeave={() => {setIsHovered(false)}}
      onClick={() => {!matches && setTappedItemIndex(index)}}
      className={!matches && "grow1"}
    >
      {matches
      ? <>
          <div>{song.title}</div>
          {isHovered 
          ? <MoreVertIcon /> 
          : <SongLength string={song.length} />}
        </>
      : <>
          <div>{song.title}</div>
          {tappedItemIndex === index ? <MoreVertIcon /> : <SongLength string={song.length} />}
        </>
      }
    </li>
  );
}

        // <>
        // <div className={classes.alignCenter}>
        //   <MoreVertIcon />
        //   <span className={classes.sideMargin}>{song.title}</span>
        // </div>
        // <SongLength string={song.length} />
        // </>