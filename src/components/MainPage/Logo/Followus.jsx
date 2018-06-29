import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";


const styles = {
  icons: {
      width: "15%",
      padding: "10px",
      paddingBottom: "0px",
      flex: "left"
  },
  label: {
    margin: 0,
    paddingTop: "5px",
    paddingLeft: "5px",
    fontSize: "15px",
    fontStyle: "italic"
  }
};

const Followus = ({ classes }) =>(
    <div>
    <h6 className={classes.label}>Follow US:</h6>

    <a href="https://github.com/nos">
    <img className= {classes.icons}
      src={require('./../icons/facebook.png')} />
    </a>

    <a href="https://github.com/nos">
    <img className= {classes.icons}
      src={require('./../icons/twitter.png')} />
    </a>

    <a href="https://github.com/nos">
    <img className= {classes.icons}
      src={require('./../icons/medium.png')} />
    </a>

    <a href="https://github.com/nos">
    <img className= {classes.icons}
      src={require('./../icons/telegram.png')} />
    </a>

    <a href="https://github.com/nos">
    <img className= {classes.icons}
      src={require('./../icons/instagram.png')} />
    </a>

    <a href="https://github.com/nos">
    <img className= {classes.icons}
      src={require('./../icons/linked.png')} />
    </a>

    <a href="https://github.com/nos">
    <img className= {classes.icons}
      src={require('./../icons/youtube.png')} />
    </a>

    <a href="https://github.com/nos">
    <img className= {classes.icons}
      src={require('./../icons/reddit.png')} />
    </a>

    </div>
);

Followus.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(Followus);
