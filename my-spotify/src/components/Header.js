import React, { useState } from 'react';
import { NavLink, Link } from "react-router-dom";

function Header() {
    const [navbar, setNavbar] = useState(false)

    const changeBackground = () => {
        if (window.scrollY > 0) {
            setNavbar(true)
        } else {
            setNavbar(false)
        }
    }
    
    
    window.addEventListener("scroll", changeBackground)
    return (
        <>
            <div className={navbar ? "header active_link" : "header"}>
                <span>
                  <Link  to='/' className="logo">
                      <img src={"//s.ytimg.com/yts/img/music/web/on_platform_logo_dark-vflzMsRak.svg"}></img>
                  </Link>
                </span>

                <span className={"tabs_selector"}>
                  <NavLink className={"tab"} exact to="/" activeStyle={{color: 'white', textDecoration:"none"}}>Home</NavLink>
                  <NavLink className={"tab"} exact to="/explore" activeStyle={{color: 'white', textDecoration:"none"}}>Explore</NavLink>
                  <NavLink className={"tab"} exact to="/library" activeStyle={{color: 'white', textDecoration:"none"}}>Library</NavLink>
                  <NavLink className={"tab"} exact to="/search" activeStyle={{color: 'white', textDecoration:"none"}}>Search</NavLink>
                </span>

                <span className={"profile_logo"}>
                  Profile
                </span>
            </div>
        </>
    )
}
export default Header;