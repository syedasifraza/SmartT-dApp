import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

const styles = {
  Ads: {}
};

const AdsTop = ({ classes }) =>(
    <div>
        <img className={classes.AdsTop}
          src={require('./../../../img/adsTop.png')} />

    </div>
);

AdsTop.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(AdsTop);
