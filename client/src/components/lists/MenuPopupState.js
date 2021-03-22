import React, { useRef } from "react";
import axios from "axios";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import { makeStyles } from "@material-ui/core/styles";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useAuth } from "../../contexts/AuthContext";

const useStyles = makeStyles({
  menu: {
    backgroundColor: "rgb(34, 34, 34)",
  },
  menuItem: {
    color: "white",
    padding: "0.5em 1.1em",
    // fontSize: 'large',
    "&.Mui-selected": {
      backgroundColor: "rgb(34, 34, 34)",
    },
    "&.MuiListItem-button:hover": {
      backgroundColor: "rgb(64, 64, 64)",
    },
  },
  libraryAdd: {
    color: "rgb(90 90 90)",
    marginRight: "0.5em",
  },
});

export default function MenuPopupState({ song, refreshSongs }) {
  const {currentUser} = useAuth();
  const classes = useStyles();
  const menuIconRef = useRef();

  const onAddToLibraryClick = async () => {
    // console.log('user email: ', currentUser.email);
    // console.log('song id: ', song.id);
    await axios.post("/user_songs", {      
        userEmail: currentUser.email,
        songId: song.id,
    });
    await refreshSongs();
  };
  const onRemoveFromLibraryClick = async () => {
    await axios.delete("/user_songs", {
      params: {
        userEmail: currentUser.email,
        songId: song.id,
      },
    });
    await refreshSongs();
  };
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <MoreVertIcon {...bindTrigger(popupState)} ref={menuIconRef} />
          <Menu
            {...bindMenu(popupState)}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "bottom", horizontal: "right" }}
            getContentAnchorEl={null}
            anchorEl={menuIconRef.current}
            classes={{ paper: classes.menu }}
          >
            {song.user_id ? (
              <MenuItem
                onClick={() => {onRemoveFromLibraryClick(); popupState.close()}}
                selected={true}
                dense
                ListItemClasses={{
                  root: classes.menuItem,
                  selected: classes.menuItem,
                }}
              >
                <LibraryAddCheckIcon classes={{ root: classes.libraryAdd }} />
                Remove from Library
              </MenuItem>
            ) : (
              <MenuItem
                onClick={() => {onAddToLibraryClick(); popupState.close()}}
                selected={true}
                dense
                ListItemClasses={{
                  root: classes.menuItem,
                  selected: classes.menuItem,
                }}
              >
                <LibraryAddIcon classes={{ root: classes.libraryAdd }} />
                Add to Library
              </MenuItem>
            )}
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
