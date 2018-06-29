import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

const styles = {
  AdsImg: {
    width: "88%",
    paddingLeft: "9px",
    paddingTop: "2px"
  }
};

const AdsTop = ({ classes }) =>(
    <div>
        <img className={classes.AdsImg}
          src={require('./../../../img/adsTop.png')} />

    </div>
);

AdsTop.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(AdsTop);
