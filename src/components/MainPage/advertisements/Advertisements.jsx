import React, {Component} from 'react';
import PropTypes from 'prop-types';
import injectSheet from "react-jss";
import { react } from "@nosplatform/api-functions";
import { u, wallet } from "@cityofzion/neon-js";
import { unhexlify, hexlify }  from "binascii";


const { injectNOS } = react.default;

const styles = {
  advertise:{}
};


class Advertisements extends Component {


  callDefault = ({classes}) => {
    return(
      <React.Fragment>
        <div className={classes.userArea}>
          <div className={classes.heading}>
           Coming Soon!
          </div>
          <div className={classes.container}>
          </div>
        </div>
        <div className={classes.buttonArea}>
        <button className={classes.homeButton} onClick={() => {
          this.props.clickHandler("default")
        }}>Home</button>
        </div>
      </React.Fragment>
    );
  }


  render() {
    const {classes} = this.props;
    return this.callDefault({classes});
  }

}

Advertisements.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  handleInvoke: PropTypes.func.isRequired
};

export default injectNOS(injectSheet(styles)(Advertisements));
