import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./components/Home"
import Header from "./components/Header"
import ArtistPage from "./components/pages/ArtistPage"
import Song from "./components/cards/SongCard"

function App() {

  return (
    <>
    <Router>
      <Switch>

      <Route  path='/artist/:id'>
        <Header />
        <ArtistPage/>
      </Route>

      <Route path='/'>
      {/* <h1>Hello</h1> */}
      <Header />
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
