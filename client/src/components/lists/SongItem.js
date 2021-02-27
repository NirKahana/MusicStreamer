import React, { useState } from "react";
import { Link } from "react-router-dom";
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

export default function SongItem({ path = false, song, link, key }) {
  const classes = useStyles();
  const [isHovered, setIsHovered] = useState(false);

  return isHovered ? (  
    <Link
      to={link}
      key={key}
      className="link"
    >
      <li
        style={
          path === song.id.toString() ? { backgroundColor: "rgb(22,22,22)" } : {}
        }
        // onMouseEnter={() => {setIsHovered(true)}}
        onMouseLeave={() => {setIsHovered(false)}}
        className={'pointer'}
      >
        <div>{song.title}</div>
        <MenuPopupState /> 
      </li>
    </Link>
  ) : (
    <li
      style={
        path === song.id.toString() ? { backgroundColor: "rgb(22,22,22)" } : {}
      }
      onMouseEnter={() => {setIsHovered(true)}}
      // onMouseLeave={() => {setIsHovered(false)}}
      className={'pointer'}
      key={key}
    >
      <div>{song.title}</div>
      <SongLength string={song.length} />
    </li>
    )
}
  