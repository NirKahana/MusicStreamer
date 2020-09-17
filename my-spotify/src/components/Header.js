import React from 'react';
import { useParams, useHistory, useLocation, NavLink, Link } from "react-router-dom";

function Header() {
    return (
        <>
        <div className="header">
            <Link className="logo" to="/">
                <img src={"//s.ytimg.com/yts/img/music/web/on_platform_logo_dark-vflzMsRak.svg"}></img>
            </Link>

            <span className={"tabs_selector"}>
              <NavLink className={"tab"} to="/" activeStyle={{color: 'white', textDecoration:"none"}}>Home</NavLink>
              <NavLink className={"tab"} to="/explore" activeStyle={{color: 'white', textDecoration:"none"}}>Explore</NavLink>
              <NavLink className={"tab"} to="/library" activeStyle={{color: 'white', textDecoration:"none"}}>Library</NavLink>
              <NavLink className={"tab"} to="/search" activeStyle={{color: 'white', textDecoration:"none"}}>Search</NavLink>
            </span>

            <span className={"profile_logo"}>
              Profile
            </span>
        </div>
        </>
    )
}
export default Header;