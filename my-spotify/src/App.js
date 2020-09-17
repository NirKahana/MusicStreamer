import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import Home from "./components/Home"
import Song from "./components/cards/SongCard"

function App() {
  return (
    <>
    <BrowserRouter>
      <div className={"header"}>
        <span className={"logo"}>
        YouTube
        </span>
        <span className={"tabs_selector"}>
          <span className={"tab"}><NavLink to="/" activeStyle={{color: 'white', textDecoration:"none"}}>Home</NavLink></span>
          <span className={"tab"}>Explore</span>
          <span className={"tab"}>Library</span>
          <span className={"tab"}>Search</span>
        </span>
        <span className={"profile_logo"}>
          Profile
        </span>
      </div>
      <Switch>
      <Route path="/">
        <Home/>
      </Route>
      <Route>
      <Home/>
      </Route>

      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
