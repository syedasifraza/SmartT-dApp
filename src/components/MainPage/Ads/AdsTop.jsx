import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

const styles = {
  AdsImg: {
    width: "100%",
    paddingLeft: "0px",
    paddingTop: "25px"
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
