import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Home from "./components/Home"
import Song from "./components/Song"

function App() {
  return (
    <>
    <BrowserRouter>
      <div>General Div</div>
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
