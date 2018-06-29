import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

const styles = {

  title_container: {
    backgroundSize: "100%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#fff"

  },

  title_container__title: {
  margin: "0px",
  paddingTop: "70px",
  fontSize: "25px",
  letterSpacing: 5,
  color: "#000",
  fontFamily: 'Roboto Slab'
},

title_container__subtitle: {
  margin: "0px",
  paddingTop: "20px",
  alignItems: "center",
  fontSize: "16px",
  justifyContent: "center",
  textAlign: "center",
  fontStyle:  "normal",
  fontWeight: 50,
  letterSpacing: 1,
  lineHeight: 1.2,
  color: "#000",
  fontFamily: "Roboto Slab"
}

};


const Titles = ({ classes } ) =>(
    <div className={classes.title_container}>
        <h5 className = {classes.title_container__title}>SmartT!</h5>
        <h5 className = {classes.title_container__subtitle}>A fully decentralized smart ticketing application on top of NEO Operating System (nOS) and NEO Blcokchain</h5>

    </div>
);

Titles.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(Titles);
