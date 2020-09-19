import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./components/Home"
import Header from "./components/Header"
import ArtistPage from "./components/pages/ArtistPage"
import AlbumPage from "./components/pages/AlbumPage"
import Song from "./components/cards/SongCard"

function App() {

  return (
    <>
    <Router>
    <Header />

      <Switch>

      <Route  path='/artist/:id'>
        <ArtistPage/>
      </Route>
      <Route  path='/album/:id'>
        <AlbumPage/>
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
