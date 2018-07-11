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
    changeState: "default",

  }


  handleChange = e => {
    if(e==="next"){
      if((this.props.currentIndex + 1) < this.props.wlArrayLen) {
        this.props.checkWLOrg(this.props.currentIndex + 1);
      } else {
        this.props.checkWLOrg(this.props.currentIndex);
      }
    } else if(e==="previous"){

      if(this.props.currentIndex > 0){
        this.props.checkWLOrg(this.props.currentIndex - 1);
      } else {
        this.props.checkWLOrg(this.props.currentIndex);
      }
    }

    this.setState({changeState: e});
  }

  handleStatus = () => {
    if(this.props.currentStatus==="Approved"){
      this.props.handleInvoke(
        this.props.scriptHash,
        "transfer",
        [this.props.userAddress,
          this.props.dappHash,
          1,
          hexlify("whitelistOrganizers"),
          u.reverseHex(wallet.getScriptHashFromAddress(this.props.currentAddress)),
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
          u.reverseHex(wallet.getScriptHashFromAddress(this.props.currentAddress)),
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
              {this.props.currentAddress}
                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Organization Name:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.currentOrgName}
                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Contact Person:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.currentPerson}
                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Email Address:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.currentEmail}
                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Phone Nubmer:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.currentPhone}
                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Application Date:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.currentDate}
                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Current Status:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.currentStatus}

                </label>
            </div>
          </div>

          <div className={classes.row}>

          <div className={classes.col25}>
            <label>{this.props.currentIndex + 1}/{this.props.wlArrayLen}</label>
          </div>
          <div className={classes.col75}>

            <button className={classes.changeButton}
              onClick={() => {this.handleChange("previous")}}>Previous</button>

            <button className={classes.changeButton}
              onClick={() => {this.handleStatus()}}>Change Statue</button>

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
