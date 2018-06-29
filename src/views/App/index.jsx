import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

import {Main} from "./../../components/MainPage";

const styles = {
  "@import": "https://fonts.googleapis.com/css?family=Source+Sans+Pro",
  "@global html, body": {
    fontFamily: "Source Sans Pro",
    padding: 0,
    margin: 0,
    backgroundColor: "#ffffff"
  }

};

const App = ({ classes }) => (
  <div>
    <Main />
  </div>
);

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(App);
