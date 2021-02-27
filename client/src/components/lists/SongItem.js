import React, { useState } from "react";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import MenuPopupState from "./MenuPopupState";
import SongLength from "./SongLength";

const useStyles = makeStyles({
  menu: {
    backgroundColor: 'white',
    color: 'white'
  },
  menuItem: {
    backgroundColor: 'white',
  }
});

export default function SongItem({ path = false, song, index, tappedItemIndex, setTappedItemIndex }) {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:650px)');
  const [isHovered, setIsHovered] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => { 
    setAnchorEl(null);
  };

  return (
    <li
      style={
        path === song.id.toString() ? { backgroundColor: "rgb(22,22,22)" } : {}
      }
      onMouseEnter={() => {setIsHovered(true)}}
      onMouseLeave={() => {setIsHovered(false)}}
      onClick={() => {!matches && setTappedItemIndex(index)}}
      className={!matches ? "grow1 pointer" : 'pointer'}
    >
      {matches
      ? <>
          <div>{song.title}</div>
          {isHovered 
          ? <MenuPopupState /> 
          : <SongLength string={song.length} />}
        </>
      : <>
          <div>{song.title}</div>
          {tappedItemIndex === index 
          ? <MenuPopupState />
           : <SongLength string={song.length} />}
        </>
      }
    </li>
  );
}
