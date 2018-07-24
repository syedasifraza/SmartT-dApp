import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

const styles = {
  Ads:{}
};

const AdsCenter = ({ classes }) =>(
    <div>
        <img className={classes.AdsCenter}
          src={require('./../../../img/adsCenter.gif')} />

    </div>
);

AdsCenter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(AdsCenter);
