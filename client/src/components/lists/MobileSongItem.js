import React, { useState } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import MenuPopupState from "./MenuPopupState";
import SongLength from "./SongLength";

const useStyles = makeStyles({
  menu: {
    backgroundColor: "white",
    color: "white",
  },
  menuItem: {
    backgroundColor: "white",
  },
});

export default function MobileSongItem({
  path = false,
  song,
  index,
  tappedItemIndex,
  setTappedItemIndex,
}) {
  const classes = useStyles();

  return (
    <li
      style={
        path === song.id.toString() ? { backgroundColor: "rgb(22,22,22)" } : {}
      }
      onMouseEnter={() => {setIsHovered(true)}}
      onMouseLeave={() => {setIsHovered(false)}}
      onClick={() => {setTappedItemIndex(index)}}
      className={!matches ? "grow1 pointer" : "pointer"}
    >
      <div>{song.title}</div>
      {tappedItemIndex === index ? (
        <MenuPopupState />
      ) : (
        <SongLength string={song.length} />
      )}
    </li>
  );
}
