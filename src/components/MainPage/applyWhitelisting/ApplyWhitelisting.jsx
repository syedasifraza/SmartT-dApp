import React, {Component} from 'react';
import PropTypes from 'prop-types';
import injectSheet from "react-jss";
import { react } from "@nosplatform/api-functions";
import { unhexlify, hexlify }  from "binascii";
import { u, wallet } from "@cityofzion/neon-js";



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
        <div className={classes.userArea}>
        <div className={classes.heading}>
          Application Form
        </div>
        <div className={classes.container}>
          <form onSubmit={this.handleSubmit}>
            <div className={classes.row}>
              <div className={classes.col25}>
                <label className={classes.label}>Organization Name:</label>
              </div>
              <div className={classes.col75}>
                <input className={classes.input}
                  type="text" id="orgname"
                  name="orgname"
                  placeholder="Required field..."
                  value={this.state.orgname}
                  onChange={this.handleChange}
                  required />
              </div>
            </div>

            <div className={classes.row}>
              <div className={classes.col25}>
                <label className={classes.label}>Contact Person:</label>
              </div>
              <div className={classes.col75}>
                <input className={classes.input}
                  type="text" id="person"
                  name="person"
                  placeholder="Required field..."
                  value={this.state.person}
                  onChange={this.handleChange}
                  required />
              </div>
            </div>

            <div className={classes.row}>
              <div className={classes.col25}>
                <label className={classes.label}>Email Address:</label>
              </div>
              <div className={classes.col75}>
                <input className={classes.input}
                  type="email" id="email"
                  name="email"
                  placeholder="Required field..."
                  value={this.state.email}
                  onChange={this.handleChange}
                  required />
              </div>
            </div>

            <div className={classes.row}>
              <div className={classes.col25}>
                <label className={classes.label}>Phone Number:</label>
              </div>
              <div className={classes.col75}>
                <input className={classes.input}
                  type="text" id="phone"
                  name="phone"
                  placeholder="Required field..."
                  value={this.state.phone}
                  onChange={this.handleChange}
                  required />
              </div>
            </div>

            <div className={classes.row}>
              <div className={classes.col25}>
                <label className={classes.label}>Wallet Address:</label>
              </div>
              <div className={classes.col75}>
                <label className={classes.label2}>
                {wallet.getAddressFromScriptHash(
                  u.reverseHex(this.props.userAddress))}
                  </label>
              </div>
            </div>

            <div className={classes.row}>
              <div className={classes.col25}>
                <label className={classes.label}>MCT Charges:</label>
              </div>
              <div className={classes.col75}>
                <label className={classes.label2}>
                0.00000001
                  </label>
              </div>
            </div>

            <div className={classes.row}>
              <input className={classes.submit_btn}
                type="submit" value="Submit" />
            </div>
          </form>
        </div>

        </div>
        <div className={classes.buttonArea}>
        <button className={classes.homeButton} onClick={() => {
          this.props.clickHandler("default")
        }}>Back</button>
        </div>
      </React.Fragment>
    );
  }

  callStatus = ({ classes }) => {
    return(
      <React.Fragment>
      <div className={classes.userArea}>
      <div className={classes.heading}>
        Application Status
      </div>
      <div className={classes.container}>
        <form>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Wallet Address:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {wallet.getAddressFromScriptHash(
                u.reverseHex(this.props.userAddress))}
                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Status:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.wlStatus}
                </label>
            </div>
          </div>
          <div className={classes.row}>
          </div>

        </form>
      </div>
      </div>

      <div className={classes.buttonArea}>
      <button className={classes.homeButton} onClick={() => {
        this.props.clickHandler("default")
      }}>Back</button>
      </div>
      </React.Fragment>
    );
  }


  render() {
    const {classes} = this.props;
    if(this.props.wlAddress){
      return this.callStatus({classes});
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
