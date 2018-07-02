import React, {Component} from 'react';
import PropTypes from 'prop-types';
import injectSheet from "react-jss";
import { react } from "@nosplatform/api-functions";
import { u, wallet } from "@cityofzion/neon-js";
import { unhexlify, hexlify }  from "binascii";


const { injectNOS } = react.default;

const styles = {
  applyWL: {}
};


class ApplyWhitelisting extends Component {

  state = {
    orgname: "",
    person: "",
    email: "",
    phone: ""
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleInvoke(
      this.props.scriptHash,
      "transfer",
      [this.props.userAddress,
        this.props.dappHash,
        1,
        hexlify("applyWhitelist"),
        hexlify(this.state.orgname),
        hexlify(this.state.person),
        hexlify(this.state.email),
        hexlify(this.state.phone)],
        false)

  }

  callApplyWL = ({ classes }) => {
    return(
      <React.Fragment>
      <div className={classes.applyWL_userArea}>

        <form className={classes.applyWL_formArea} onSubmit={this.handleSubmit}>
          <label className={classes.applyWL_formLabel}>Organization Name: </label>
          <input className={classes.applyWL_formInput} id="orgname"
            name="orgname" type="text" value={this.state.orgname}
            onChange={this.handleChange} />
          <br />
          <label className={classes.applyWL_formLabel}>Contact Person: </label>
          <input className={classes.applyWL_formInput} id="person"
          name="person" type="text" value={this.state.person}
          onChange={this.handleChange} />
          <br />
          <label className={classes.applyWL_formLabel}>Email Address: </label>
          <input className={classes.applyWL_formInput} id="email"
          name="email" type="email" value={this.state.email}
          onChange={this.handleChange} />
          <br />
          <label className={classes.applyWL_formLabel}>Phone Number: </label>
          <input className={classes.applyWL_formInput} id="phone"
          name="phone" type="text" value={this.state.phone}
          onChange={this.handleChange} />
          <br />
          <label className={classes.applyWL_formLabel}>Wallet address: </label>
          <label className={classes.applyWL_formInput}>{this.props.userAddress}</label>
          <br />
          <br />
          <label className={classes.applyWL_formLabel}>MCT Charges: </label>
          <label className={classes.applyWL_formInput}>0.00000001</label>
          <br />
          <br />

          <input type="submit" value="Submit" />
        </form>

      </div>
      </React.Fragment>
    );
  }

  callApplied = ({ classes }) => {
    return(
      <React.Fragment>
      <div className={classes.applyWL_userArea}>

        <p>Your whitelisting application already submitted!
        please Wait for approval or contact us at asif@kisti.re.kr</p>

      </div>
      </React.Fragment>
    );
  }

  callApproved = ({ classes }) => {
    return(
      <React.Fragment>
      <div className={classes.applyWL_userArea}>

        <p>Your whitelisting application already Approved!!</p>

      </div>
      </React.Fragment>
    );
  }

  render() {
    const {classes} = this.props;
    if(this.props.wlAddress){
      if(this.props.wlStatus){
        return this.callApproved({classes});
      } else {
        return this.callApplied({classes});
      }
    } else {
      return this.callApplyWL({classes});
    }
  }

}

ApplyWhitelisting.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  handleInvoke: PropTypes.func.isRequired
};

export default injectNOS(injectSheet(styles)(ApplyWhitelisting));
