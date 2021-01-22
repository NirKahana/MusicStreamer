import React, { useState } from 'react';
import { NavLink, Link } from "react-router-dom";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import ExploreIcon from '@material-ui/icons/Explore';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function Header() {
    const [navbar, setNavbar] = useState(false)
    const matches = useMediaQuery('(min-width:450px)');


    const changeBackground = () => {
        if (window.scrollY > 0) {
            setNavbar(true)
        } else {
            setNavbar(false)
        }
    }
    
    window.addEventListener("scroll", changeBackground);
    return (
        <>
            <div className={navbar ? "header active_link" : "header"}>
                <span>
                  <Link  to='/' className="logo">
                      <img src={"//s.ytimg.com/yts/img/music/web/on_platform_logo_dark-vflzMsRak.svg"}></img>
                  </Link>
                </span>

                <span className={"tabs_selector"}>
                  <NavLink className={"tab"} exact to="/" activeStyle={{color: 'white', textDecoration:"none"}}>{matches ? 'Home' :<HomeIcon />}</NavLink>
                  <NavLink className={"tab"} exact to="/explore" activeStyle={{color: 'white', textDecoration:"none"}}>{matches ? 'Explore' :<ExploreIcon />}</NavLink>
                  <NavLink className={"tab"} exact to="/library" activeStyle={{color: 'white', textDecoration:"none"}}>{matches ? 'Library' :<LibraryMusicIcon />}</NavLink>
                  {/* <NavLink className={"tab"} exact to="/library" activeStyle={{color: 'white', textDecoration:"none"}}>Library</NavLink> */}
                  <NavLink className={"tab search"} exact to="/explore" activeStyle={{color: 'white', textDecoration:"none"}}><SearchIcon /> {matches ? <span>Search</span> : null}</NavLink>
                  {/* <NavLink className={"tab"} exact to="/search" activeStyle={{color: 'white', textDecoration:"none"}}>Search</NavLink> */}
                </span>

                <span className={"profile_logo"}>
                    <AccountCircleIcon fontSize={'large'}/>
                </span>
            </div>
        </>
    )
}
export default Header;