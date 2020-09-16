import React from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Home from "./components/Home"

function App() {
  return (
    <>
    <BrowserRouter>
      <div>General Div</div>
      <Switch>
      {/* <Route path="/:id">
        <Song/>
      </Route> */}
      <Route>
      <Home/>
      </Route>

      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
