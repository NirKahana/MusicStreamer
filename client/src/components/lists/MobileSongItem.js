import React, { useState } from "react";
import { Link } from "react-router-dom";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/core/styles";
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";

import MenuPopupState from "./MenuPopupState";
import SongLength from "./SongLength";

const useStyles = makeStyles({
  playArrow: {
    marginRight: '0.5em'
  }
});

export default function MobileSongItem({
  path = false,
  song,
  index,
  tappedItemIndex,
  setTappedItemIndex,
  link
}) {
  const classes = useStyles();

  return (
    <li
      style={
        path === song.id.toString() ? { backgroundColor: "rgb(22,22,22)" } : {}
      }
      onClick={() => {setTappedItemIndex(index)}}
      className={"grow1 pointer"}
      key={index}
    >
      <div className="flex align_center justify_between">
        <Link to={link} className='link'>     
          <PlayArrowIcon className={classes.playArrow}/>
        </Link>
        <div>{song.title}</div>
      </div>
      {tappedItemIndex === index 
      ? <MenuPopupState />
      : <SongLength string={song.length} />
      }
    </li>
  );
}

{/* <div className="flex align_center justify_between">
<Link to={`/song/${song.id}?artist=${artist.id}`} key={index} className={'link'}>     
    <PlayArrowIcon />
</Link>
<SongItem song={song} index={index} tappedItemIndex={tappedItemIndex} setTappedItemIndex={setTappedItemIndex} />
</div> */}
