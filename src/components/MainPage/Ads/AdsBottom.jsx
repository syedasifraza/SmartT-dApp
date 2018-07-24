import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

const styles = {
  Ads: {}
};

const AdsBottom = ({ classes }) =>(
    <div>
        <img className={classes.AdsTop}
          src={require('./../../../img/adsTop.png')} />

    </div>
);

AdsBottom.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(AdsBottom);
