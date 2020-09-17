import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import Home from "./components/Home"
import Header from "./components/Header"
import ArtistPage from "./components/pages/ArtistPage"
import Song from "./components/cards/SongCard"

function App() {
  const breakPointsForCards = [
    { width: 1, itemsToShow: 1, itemsToScroll: 1},
    { width: 450, itemsToShow: 2, itemsToScroll: 2},
    { width: 700, itemsToShow: 3, itemsToScroll: 3},
    { width: 900, itemsToShow: 4, itemsToScroll: 4},
    { width: 1000, itemsToShow: 5, itemsToScroll: 5},
]
  const breakPointsForArtists = [
    { width: 1, itemsToShow: 1, itemsToScroll: 1},
    { width: 450, itemsToShow: 2, itemsToScroll: 2},
    { width: 700, itemsToShow: 3, itemsToScroll: 3},
    { width: 1000, itemsToShow: 4, itemsToScroll: 4},
    { width: 1200, itemsToShow: 5, itemsToScroll: 5},
]
  return (
    <>
    <BrowserRouter>
    <Header />

      <Switch>
      <Route exact path="/artist/:id">
        <ArtistPage breakPointsForCards={breakPointsForCards}/>
      </Route>

      <Route exact path="/">
        <Home breakPointsForCards={breakPointsForCards} breakPointsForArtists={breakPointsForArtists}/>
      </Route>

        {/* <Route>
          <Home/>
        </Route> */}
      </Switch>

    </BrowserRouter>
    </>
  );
}

export default App;
