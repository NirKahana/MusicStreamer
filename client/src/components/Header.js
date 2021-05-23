import React, { useState } from 'react';
import { NavLink, Link, useHistory } from "react-router-dom";
import swal from 'sweetalert';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery, Input} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import ExploreIcon from '@material-ui/icons/Explore';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useAuth } from "../contexts/AuthContext";

const useStyles = makeStyles({
	header: {
		backgroundColor: "rgb(10, 10, 10)",
  	height: "2.5em",
  	display: 'flex',
  	position: 'fixed',
  	top: '0',
  	width: '100vw',
  	justifyContent: 'center',
  	alignItems: 'center',
  	padding: '0.75em 0',
  	fontSize: '1.2em',
  	fontFamily: '"Inter", sans-serif',
  	zIndex: '9999',
  	transition: '350ms',
  	minWidth: '320px',
	},
	active: {
		borderBottom: '1px solid rgb(43, 43, 43)',
		transition: '400ms',
	},
  searchInput: {
		color: 'white',
		padding: '0em 1em',
		fontSize: '1em',
		fontWeight: 'bold',
		flexGrow: '1',
	},
	arrowBackIcon: {
		cursor: 'pointer',
		color: 'rgb(141, 141, 141)'
	}
});

function Header() {
	const classes = useStyles();
	const history = useHistory();
  const { signout } = useAuth();

  const [navbar, setNavbar] = useState(false)
  const [searchIsOn, setSearchIsOn] = useState(false);
  const matches = useMediaQuery('(min-width:650px)');

	const signOut = async () => {
		try {
			signout();
			history.push('/signin');
		}
		catch(error) {
			swal("Failed To Sign Out", error.message, "error");
		}
	};
  const changeBackground = () => {
        if (window.scrollY > 0) {
            setNavbar(true)
        } else {
            setNavbar(false)
        }
  }
  const onSearchButtonClick = () => {
    setSearchIsOn(true);
  };
  const onBackButtonClick = () => {
    setSearchIsOn(false);
  };
  
  window.addEventListener("scroll", changeBackground);
  return (
    <>
      <div className={navbar ? `${classes.header} ${classes.active} ` : `${classes.header}`}>
        <Link className="tab logo" to='/'> <img src={matches ? "//s.ytimg.com/yts/img/music/web/on_platform_logo_dark-vflzMsRak.svg" : (process.env.PUBLIC_URL + "/images/ytm_icon.png")} alt="youtube logo"></img></Link>
				{(!searchIsOn) 
					? (
						<>
        			<NavLink className={"tab"} exact to="/" activeStyle={{color: 'white', textDecoration:"none"}}>{matches ? 'Home' :<HomeIcon />}</NavLink>
        			<NavLink className={"tab"} exact to="/explore" activeStyle={{color: 'white', textDecoration:"none"}}>{matches ? 'Explore' :<ExploreIcon />}</NavLink>
        			<NavLink className={"tab"} exact to="/library/songs" activeStyle={{color: 'white', textDecoration:"none"}}>{matches ? 'Library' :<LibraryMusicIcon />}</NavLink>
        			<span className={"tab search"} onClick={onSearchButtonClick}><SearchIcon /> {matches ? <span>Search</span> : null}</span>
					</>)
					: (
						<div className="searchInputContainer">
						<ArrowBackIcon classes={{root: classes.arrowBackIcon}} onClick={onBackButtonClick}/>
						<Input className='searchInput' 
									 autoFocus placeholder="Search" 
									 disableUnderline 
									 classes={{root: classes.searchInput}}
						/>
					</div>)
				}
        <span className={"profile_logo"}>
          <AccountCircleIcon fontSize={'large'} onClick={signOut}/>
        </span> 
      </div>
    </>
  );
}
export default Header;