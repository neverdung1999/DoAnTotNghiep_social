import React from "react";
import routers from "./routers";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./redux/actions/Index";
import Cookies from "universal-cookie";

function App(props) {
  const cookies = new Cookies();

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
      <div className="container">{showContentComponents(routers)}</div>
    </Router>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOutRequest: (id) => {
      dispatch(actions.logOutRequest(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(App);
