import React, { useRef } from 'react'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import { makeStyles } from '@material-ui/core/styles';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

const useStyles = makeStyles({
  menu: {
    backgroundColor: 'rgb(34, 34, 34)',
    // color: 'white'
  },
  menuItem: {
    color: 'white',
    padding: '0.3em 1.1em',
    // fontSize: 'large',
    "&.Mui-selected": {
      backgroundColor: "rgb(34, 34, 34)"
    },
    "&.MuiListItem-button:hover": {
      backgroundColor: "rgb(34, 34, 34)"
    }
  },
  libraryAdd: {
    color: 'rgb(90 90 90)',
    marginRight: '0.5em'
  }
});

export default function MenuPopupState() {
  const classes = useStyles();
  const menuIconRef = useRef();

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <MoreVertIcon 
            {...bindTrigger(popupState)} 
            ref={menuIconRef}
          />
          <Menu 
            {...bindMenu(popupState)}
            anchorOrigin={{ vertical: 'bottom', horizontal: "left" }}
            transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            getContentAnchorEl={null}
            anchorEl={menuIconRef.current}
            classes={{paper: classes.menu}}
          >
            <MenuItem 
              onClick={popupState.close}
              selected={true}
              dense
              ListItemClasses={{root: classes.menuItem, selected: classes.menuItem}}
            >
              <LibraryAddIcon classes={{root: classes.libraryAdd}}/>
              Add to Library
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
