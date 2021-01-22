import React, { useState } from 'react';
import { NavLink, Link } from "react-router-dom";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import ExploreIcon from '@material-ui/icons/Explore';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// import SmallerYouTubeIcon from "../images/ytm_icon"

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
                {/* <span>
                  <Link  to='/' className="logo">
                      <img src={matches ? "//s.ytimg.com/yts/img/music/web/on_platform_logo_dark-vflzMsRak.svg" : (process.env.PUBLIC_URL + "/images/ytm_icon.png")}></img>
                  </Link>
                </span> */}

                {/* <span className={"tabs_selector"}> */}
                  <Link className="tab logo" to='/'> <img src={matches ? "//s.ytimg.com/yts/img/music/web/on_platform_logo_dark-vflzMsRak.svg" : (process.env.PUBLIC_URL + "/images/ytm_icon.png")}></img></Link>
                  <NavLink className={"tab"} exact to="/" activeStyle={{color: 'white', textDecoration:"none"}}>{matches ? 'Home' :<HomeIcon />}</NavLink>
                  <NavLink className={"tab"} exact to="/explore" activeStyle={{color: 'white', textDecoration:"none"}}>{matches ? 'Explore' :<ExploreIcon />}</NavLink>
                  <NavLink className={"tab"} exact to="/library" activeStyle={{color: 'white', textDecoration:"none"}}>{matches ? 'Library' :<LibraryMusicIcon />}</NavLink>
                  <NavLink className={"tab search"} exact to="/explore" activeStyle={{color: 'white', textDecoration:"none"}}><SearchIcon /> {matches ? <span>Search</span> : null}</NavLink>
                {/* </span> */}

                <span className={"profile_logo"}>
                    <AccountCircleIcon fontSize={'large'}/>
                </span>
            </div>
        </>
    )
}
export default Header;