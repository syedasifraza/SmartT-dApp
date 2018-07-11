import React, {Component} from 'react';
import PropTypes from 'prop-types';
import injectSheet from "react-jss";
import { react } from "@nosplatform/api-functions";
import { u, wallet } from "@cityofzion/neon-js";
import { unhexlify, hexlify }  from "binascii";


const { injectNOS } = react.default;

const styles = {
  wlorg:{}
};


class WhitelistOrganizers extends Component {

  state = {

    index: 0,

  }


  handleChange = e => {
    if(e==="next"){
      if((this.state.index + 1) < this.props.whitelisted.length) {
        this.setState({index: this.state.index+1})
      }
    } else if(e==="previous"){

      if(this.state.index > 0){
        this.setState({index: this.state.index-1})
      }
    }

  }

  handleStatus = () => {
    if(this.props.whitelisted[this.state.index][6]==="Approved"){
      this.props.handleInvoke(
        this.props.scriptHash,
        "transfer",
        [this.props.userAddress,
          this.props.dappHash,
          1,
          hexlify("whitelistOrganizers"),
          this.props.whitelisted[this.state.index][0],
          0],
          false)
    } else {
      this.props.handleInvoke(
        this.props.scriptHash,
        "transfer",
        [this.props.userAddress,
          this.props.dappHash,
          1,
          hexlify("whitelistOrganizers"),
          this.props.whitelisted[this.state.index][0],
          1],
          false)
    }
  }


  callDefault = ({classes}) => {
    return(
      <React.Fragment>
      <div className={classes.userArea}>
      <div className={classes.heading}>
        Change Organizer's Status
      </div>
      <div className={classes.container}>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Wallet Address:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {wallet.getAddressFromScriptHash(
                u.reverseHex(this.props.whitelisted[this.state.index][0]))}
                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Organization Name:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.whitelisted[this.state.index][1]}
                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Contact Person:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.whitelisted[this.state.index][2]}
                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Email Address:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.whitelisted[this.state.index][3]}
                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Phone Nubmer:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.whitelisted[this.state.index][4]}
                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Application Date:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.whitelisted[this.state.index][5]}
                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Current Status:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.whitelisted[this.state.index][6]}

              </label>
            </div>
          </div>

          <div className={classes.row}>

          <div className={classes.col25}>
            <label>{this.state.index + 1}/{this.props.whitelisted.length}</label>
          </div>
          <div className={classes.col75}>

            <button className={classes.changeButton}
              onClick={() => {this.handleChange("previous")}}>Previous</button>

            <button className={classes.changeButton}
              onClick={() => {this.handleStatus()}}>Change Status</button>

            <button className={classes.changeButton}
              onClick={() => {this.handleChange("next")}}>Next</button>
          </div>

          </div>

          <div className={classes.row}>
          </div>

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

WhitelistOrganizers.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  handleInvoke: PropTypes.func.isRequired
};

export default injectNOS(injectSheet(styles)(WhitelistOrganizers));
