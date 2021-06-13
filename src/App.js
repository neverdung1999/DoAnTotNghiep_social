import React from "react";
import routers from "./routers";
import { auth } from "./services/firebase";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App(props) {
  const showContentComponents = (routers) => {
    let results = null;
    if (routers.length > 0) {
      results = routers.map((router, index) => {
        return (
          <Route
            key={index}
            path={router.path}
            exact={router.exact}
            component={router.main}
          />
        );
      });
    }
    return <Switch>{results}</Switch>;
  };

  return (
    <Router>
      <Header />
      <div className="clearfix"></div>
      <div className="container">
        {showContentComponents(routers)}
      </div>
    </Router>
  );
}

export default App;
