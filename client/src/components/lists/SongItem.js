import React, { useState } from "react";
import { Link } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import MenuPopupState from "./MenuPopupState";
import SongLength from "./SongLength";

const useStyles = makeStyles({
  // menu: {
  //   backgroundColor: "white",
  //   color: "white",
  // },
  // menuItem: {
  //   backgroundColor: "white",
  // },
  title: {
    flexGrow: '1',
    padding: '0.75em 0.5em'
  }
});

export default function SongItem({ path = false, song, link, key, index, tappedItemIndex, setTappedItemIndex, refreshSongs}) {
  const classes = useStyles();
  // const [isHovered, setIsHovered] = useState(false);

  return index === tappedItemIndex ? (
    <li
      style={path === song.id.toString() ? { backgroundColor: "rgb(22,22,22)" } : {}}
      // onMouseLeave={() => {setTappedItemIndex(false)}}
      className={"pointer list_item"}
      key={index}
    >
      <Link to={link} key={key} className="link">
        <div className={classes.title}>{song.title}</div>
      </Link>
      <MenuPopupState song={song} refreshSongs={refreshSongs} />
    </li>
  ) : (
    <li
      style={
        path === song.id.toString() ? { backgroundColor: "rgb(22,22,22)" } : {}
      }
      onMouseEnter={() => {setTappedItemIndex(index)}}
      // onMouseLeave={() => {setIsHovered(false)}}
      className={` pointer list_item`}
      key={key}
    >
      <Link to={link} key={key} className="link">
        <div className={classes.title}>{song.title}</div>
      </Link>
        <SongLength string={song.length} />
    </li>
  );
}
