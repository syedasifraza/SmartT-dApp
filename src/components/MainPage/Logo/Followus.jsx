import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";


const styles = {
  followus:{}
};

const Followus = ({ classes }) =>(
    <div>
    <h6 className={classes.iconsLabel}>About US:</h6>

    <a href="https://facebook.com/smarttnos">
    <img className= {classes.icons}
      src={require('./../icons/facebook.png')} />
    </a>

    <a href="https://twitter.com/smartt_nos">
    <img className= {classes.icons}
      src={require('./../icons/twitter.png')} />
    </a>

    <a href="https://medium.com/@smartt_nos">
    <img className= {classes.icons}
      src={require('./../icons/medium.png')} />
    </a>

    <a href="https://t.me/smartt_nos">
    <img className= {classes.icons}
      src={require('./../icons/telegram.png')} />
    </a>

    <a href="https://discord.gg/6dZDspu">
    <img className= {classes.icons}
      src={require('./../icons/discord.png')} />
    </a>

    <a href="https://github.com/syedasifraza/SmartT-dApp">
    <img className= {classes.icons}
      src={require('./../icons/github.png')} />
    </a>

    <a href="https://www.youtube.com/channel/UCC8pGc8D1VjyoM8nD3adzRQ">
    <img className= {classes.icons}
      src={require('./../icons/youtube.png')} />
    </a>

    <a href="https://reddit.com/user/smartt_nos">
    <img className= {classes.icons}
      src={require('./../icons/reddit.png')} />
    </a>
    
    </div>
);

Followus.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(Followus);
