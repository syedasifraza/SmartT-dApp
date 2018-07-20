import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

const styles = {

  tickets:{}

};


const Titles = ({ classes } ) =>(
    <div className={classes.title_container}>
        <h5 className = {classes.title_container__title}>SmartT!</h5>
        <h5 className = {classes.title_container__subtitle}>A fully decentralized, secure, high speed and user incentivised smart ticketing dApp solution on top of Neo Operating System (nOS)</h5>

    </div>
);

Titles.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(Titles);
