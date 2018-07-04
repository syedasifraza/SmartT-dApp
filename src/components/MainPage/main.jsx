import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import {Logo, Titles, Followus} from "./Logo";
import {AdsCenter, AdsTop} from "./Ads";
import {MainScreen} from "./MainScreen";

const styles = {
  wrapper: {
  background: "linear-gradient(to right, #8FBC8F, #3CB371)",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
},

main: {
  height: "90vh",
  background: "#ddd",
  boxShadow: [0, 13, 40, -13, "rgba(0,0,0,0.75)"],
  width: "90%",
  margin: [0, "auto"]

},

leftCol: {
    height: "100%",
    float: "left",
    width: "15%"
},

leftCol_top: {
    height: "20%"
},

leftCol_center: {
    height: "60%",
    background: "#fff",
    borderRadius: "5%",
    borderColor: "#fff"
},

leftCol_bottom: {
    height: "20%"
},

rightCol: {
    height: "100%",
    float: "left",
    width: "10%",
    background: "#fff"
},

rightCol_top: {
    height: "19%"

},
rightCol_center: {
    height: "61%",
    borderBottom: "solid",
    borderTop: "solid"
},

rightCol_bottom: {
    height: "20%"

}


};

const Main = ({ classes }) => (
  <div className={classes.wrapper}>
  <div className={classes.main}>
  <div className={classes.leftCol}>
  <div className={classes.leftCol_top}><Logo /></div>
  <div className={classes.leftCol_center} ><Titles /></div>
  <div className={classes.leftCol_bottom}><Followus /></div>

  </div>
  <MainScreen />
  <div className={classes.rightCol}>
    <div className={classes.rightCol_top}><AdsTop /></div>
    <div className={classes.rightCol_center}><AdsCenter /></div>
    <div className={classes.rightCol_bottom}><AdsTop /></div>

  </div>
  </div>
  </div>
);

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(Main);
