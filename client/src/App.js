import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import ArtistPage from "./components/pages/ArtistPage";
import AlbumPage from "./components/pages/AlbumPage";
import PlaylistPage from "./components/pages/PlaylistPage";
import SongPage from "./components/pages/SongPage";
import Signup from "./components/auth/Signup";
import NotFound from "./components/pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
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
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>

            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
