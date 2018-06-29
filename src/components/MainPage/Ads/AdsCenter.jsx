import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

const styles = {
  AdsImg: {
    width: "88%",
    paddingTop: "2px",
    paddingLeft: "9px"
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
