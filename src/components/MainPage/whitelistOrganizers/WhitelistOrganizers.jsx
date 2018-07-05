import React, {Component} from 'react';
import PropTypes from 'prop-types';
import injectSheet from "react-jss";
import { react } from "@nosplatform/api-functions";
import { u, wallet } from "@cityofzion/neon-js";
import { unhexlify, hexlify }  from "binascii";


const { injectNOS } = react.default;

const styles = {
  wlOrg: {}
};


class WhitelistOrganizers extends Component {

  state = {
    changeState: "default",

  }


  handleChange = e => {
    if(e==="next"){
      console.log(this.props.wlArrayLen)
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
      alert("Are you sure to change status from Approve to Disapprove?")
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
      alert("Are you sure to change status from Waiting to Approve?")
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

  handleSubmit = e => {

    if(this.props.currentStatus==="Approved"){
      alert("Are you sure to change status from Approve to Disapprove?")
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
      alert("Are you sure to change status from Waiting to Approve?")
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


  callDefault = ({ classes }) => {
    return(
      <React.Fragment>
        <div className={classes.userArea}>
          <div>
          <br />
          <br />
          {this.props.currentIndex}
          <br />
          <br />
          {this.props.currentAddress}
          <br />
          <br />
          {this.props.currentOrgName}
          <br />
          <br />
          {this.props.currentPerson}
          <br />
          <br />
          {this.props.currentEmail}
          <br />
          <br />
          {this.props.currentPhone}
          <br />
          <br />
          {this.props.currentDate}
          <br />
          <br />
          {this.props.currentStatus}
          <button onClick={() => {this.handleStatus()}}>Change Statue</button>
          <br />
          <br />
          </div>
          <div>
          <button onClick={() => {this.handleChange("previous")}}>Previous</button>
          <button onClick={() => {this.handleChange("next")}}>Next</button>
          </div>
        </div>
        <div className={classes.buttonArea}>
        <button className={classes.homeButton} onClick={() => {
          this.props.clickHandler("default")
        }}>test</button>
        </div>
      </React.Fragment>
    );
  }

  callNext = ({ classes }) => {
    return(
      <React.Fragment>
      <div className={classes.userArea}>
        <div>
        <br />
        <br />
        {this.props.currentIndex}
        <br />
        <br />
        {this.props.currentAddress}
        <br />
        <br />
        {this.props.currentOrgName}
        <br />
        <br />
        {this.props.currentPerson}
        <br />
        <br />
        {this.props.currentEmail}
        <br />
        <br />
        {this.props.currentPhone}
        <br />
        <br />
        {this.props.currentDate}
        <br />
        <br />
        {this.props.currentStatus}
        <button onClick={() => {this.handleStatus()}}>Change Statue</button>
        <br />
        <br />
        </div>
        <div>
        <button onClick={() => {this.handleChange("previous")}}>Previous</button>
        <button onClick={() => {this.handleChange("next")}}>Next</button>
        </div>
      </div>
      <div className={classes.buttonArea}>
      <button className={classes.homeButton} onClick={() => {
        this.props.clickHandler("default")
      }}>test</button>
      </div>
      </React.Fragment>
    );
  }

  
  render() {
    const {classes} = this.props;
    if(this.state.changeState==="next"
    || this.state.changeState==="previous") {
      return this.callNext({classes});
    } else {
      return this.callDefault({classes});
    }


  }

}

WhitelistOrganizers.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  handleInvoke: PropTypes.func.isRequired
};

export default injectNOS(injectSheet(styles)(WhitelistOrganizers));
