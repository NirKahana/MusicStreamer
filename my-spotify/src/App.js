import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import Home from "./components/Home"
import Header from "./components/Header"
import ArtistPage from "./components/pages/ArtistPage"
import AlbumPage from "./components/pages/AlbumPage"
import PlaylistPage from "./components/pages/PlaylistPage"
import SongPage from "./components/pages/SongPage"

function App() {


  return (
    <>
    <Router>
    <Header />

      <Switch>

      <Route exact path='/artist/:id'>
        <ArtistPage/>
      </Route>

      <Route exact path='/album/:id'>
        <AlbumPage/>
      </Route>
      <Route exact path='/playlist/:id'>
        <PlaylistPage/>
      </Route>
      <Route path='/song/:id'>
        <SongPage/>
      </Route>

      <Route path='/'>
        <Home />
      </Route>

        {/* <Route>
          <Home/>
        </Route> */}

      </Switch>
    </Router>
    </>
  );
}

export default App;
