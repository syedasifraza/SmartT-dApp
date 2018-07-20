import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

const styles = {
logo:{}
};


const Logo = ({ classes }) =>(
    <div>
        <img className={classes.Logo_img}
          src={require('./../../../img/logo.png')} />
    </div>
);

Logo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(Logo);
