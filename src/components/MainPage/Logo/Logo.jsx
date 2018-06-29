import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

const styles = {
Logo_img: {
    width: "100%",
    hieght: "100%",
    flex: "auto",
    alignContent:"center",
    marginTop: "5%"
}
};


const Logo = ({ classes }) =>(
    <div>
        <img className={classes.Logo_img}
          src={require('./../../../img/Logo.png')} />
    </div>
);

Logo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(Logo);
