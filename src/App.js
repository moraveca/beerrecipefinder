import React from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Detail from "./pages/Detail";
import Header from "./components/Header"

function App() {
  return (
    <HashRouter basename="/">
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          {/* <Route exact path="/search/:query" component={Homepage} /> */}
          <Route exact path="/recipes/:id" component={Detail} />
          {/* <Route component={NoMatch} /> */}
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
