import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import "./App.css";
import Home from "./components/Home";
import Header from "./components/Header";
import ArtistPage from "./components/pages/ArtistPage";
import AlbumPage from "./components/pages/AlbumPage";
import PlaylistPage from "./components/pages/PlaylistPage";
import SongPage from "./components/pages/SongPage";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import NotFound from "./components/pages/NotFound";
import { useAuth } from "./contexts/AuthContext";
import Library from "./components/pages/Library";

function App() {
  const { currentUser } = useAuth();

  return currentUser ? (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/artist/:id">
            <ArtistPage />
          </Route>
          <Route exact path="/album/:id">
            <AlbumPage />
          </Route>
          <Route exact path="/playlist/:id">
            <PlaylistPage />
          </Route>
          <Route exact path="/song/:id">
            <SongPage />
          </Route>
          <Route exact path="/library/songs">
            <Library />
          </Route>
          <Route exact path="/library/artists">
            <Library />
          </Route>
          <Route exact path="/library/playlists">
            <Library />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </>
  ) : (
    <>
      <Router>
        <Switch>
          <Route exact path="/signup">
            <Signup /> 
          </Route>
          <Route path="/">
            <Redirect to="/signin" />
            <Signin />
          </Route>
          <Route exact path="/signin">
            <Signin />
          </Route>
          {/* <Route>
              <NotFound />
            </Route> */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
