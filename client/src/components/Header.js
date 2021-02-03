import React, { useState } from 'react';
import { NavLink, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery, Input} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import ExploreIcon from '@material-ui/icons/Explore';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles({
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

  const [navbar, setNavbar] = useState(false)
  const [searchIsOn, setSearchIsOn] = useState(false);
  const matches = useMediaQuery('(min-width:650px)');
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
      <div className={navbar ? "header active_link" : "header"}>
        <Link className="tab logo" to='/'> <img src={matches ? "//s.ytimg.com/yts/img/music/web/on_platform_logo_dark-vflzMsRak.svg" : (process.env.PUBLIC_URL + "/images/ytm_icon.png")}></img></Link>
				{(!searchIsOn) 
					? (
						<>
        			<NavLink className={"tab"} exact to="/" activeStyle={{color: 'white', textDecoration:"none"}}>{matches ? 'Home' :<HomeIcon />}</NavLink>
        			<NavLink className={"tab"} exact to="/explore" activeStyle={{color: 'white', textDecoration:"none"}}>{matches ? 'Explore' :<ExploreIcon />}</NavLink>
        			<NavLink className={"tab"} exact to="/library" activeStyle={{color: 'white', textDecoration:"none"}}>{matches ? 'Library' :<LibraryMusicIcon />}</NavLink>
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
          <AccountCircleIcon fontSize={'large'} />
        </span> 
      </div>
    </>
  )
}
export default Header;