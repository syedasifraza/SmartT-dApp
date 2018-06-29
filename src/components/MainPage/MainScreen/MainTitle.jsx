import React, {Component} from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";


const styles = {

  middleCol_Top: {
    height: "8%",
    marginTop: "2px",
    marginLeft: "1px",
    marginRight: "1px",
    paddingTop: "0px",
    border: ["2px", "none", "#fff"],
    borderRadius: "10px",
    background:"linear-gradient(to top, #5CA571, #fff)"
  },
  mainTitle_Label: {
    margin: 0,
    paddingTop: "15px",
    color: "#fff",
    fontFamily: "sans-serif",
    textAlign: "center",
    alignItems: "center"
  }

};


const MainTitle = ({classes}) => (
    <div className={classes.middleCol_Top}>
      <h3 className={classes.mainTitle_Label}>
        Smart Ticketing for Smart Economy
      </h3>
    </div>
);


MainTitle.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(MainTitle);
