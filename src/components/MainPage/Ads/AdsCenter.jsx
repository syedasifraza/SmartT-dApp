import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

const styles = {
  AdsImg: {
    width: "100%",
    hieght: "130%",
    paddingTop: "60px"
  }
};

const AdsCenter = ({ classes }) =>(
    <div>
        <img className={classes.AdsImg}
          src={require('./../../../img/adsCenter.gif')} />

    </div>
);

AdsCenter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(AdsCenter);
