import React, {Component} from 'react';
import PropTypes from 'prop-types';
import injectSheet from "react-jss";
import { react } from "@nosplatform/api-functions";
import { u, wallet } from "@cityofzion/neon-js";
import { unhexlify, hexlify }  from "binascii";


const { injectNOS } = react.default;

const styles = {
  ManageEvents: {}
};


class ManageEvents extends Component {

  state = {
    changeState: "default",
    createEvent: false,
    eventCat: "",
    eventName: "",
    eventAddr: "",
    ticketPrice: 0,
    totalTickets: 0,
    saleStart: 0,
    saleEnd: 0,
    eventDate: 0,

  }

  handleValues = e => {
    this.setState({[e.target.name]: e.target.value})

  }

  handleCreate = e => {
    this.setState({createEvent: true})
  }

  handleChange = e => {
    if(e==="next"){
      console.log(this.props.currentMELen)
      if((this.props.currentMEIndex + 1) < this.props.currentMELen) {
        this.props.checkMEOrg(this.props.currentMEIndex + 1);
      } else {
        this.props.checkMEOrg(this.props.currentMEIndex);
      }
    } else if(e==="previous"){

      if(this.props.currentMEIndex > 0){
        this.props.checkMEOrg(this.props.currentMEIndex - 1);
      } else {
        this.props.checkMEOrg(this.props.currentMEIndex);
      }
    }

    this.setState({changeState: e});
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleInvoke(
      this.props.scriptHash,
      "transfer",
      [this.props.userAddress,
        this.props.dappHash,
        1,
        hexlify("deployEvent"),
        hexlify(this.state.eventCat),
        hexlify(this.state.eventName),
        hexlify(this.state.eventAddr),
        parseInt(this.state.ticketPrice),
        parseInt(this.state.totalTickets),
        String(u.reverseHex(
          u.int2hex(new Date(this.state.saleStart)
          .getTime()/1000))),
        String(u.reverseHex(
          u.int2hex(new Date(this.state.saleEnd)
          .getTime()/1000))),
        String(u.reverseHex(
          u.int2hex(new Date(this.state.eventDate)
          .getTime()/1000)))],
        false)


  }



  callDefault = ({ classes }) => {
    return(
      <React.Fragment>
        <div className={classes.userArea}>
        <div>
        {this.props.currentCat}
        <br />
        <br />
        {this.props.currentName}
        <br />
        <br />
        {this.props.currentAddr}
        <br />
        <br />
        {this.props.currentPrice}
        <br />
        <br />
        {this.props.currentTotal}
        <br />
        <br />
        {this.props.currentAvail}
        <br />
        <br />
        {this.props.currentSold}
        <br />
        <br />
        {this.props.currentStart}

        <br />
        <br />
        {this.props.currentEnd}

        <br />
        <br />
        {this.props.currentEventTime}

        <br />
        <br />
        {this.props.currentIncome}

        <br />
        <br />
        </div>
          <div>
          <button onClick={() => {this.handleChange("previous")}}>Previous</button>
          <button onClick={() => {this.handleChange("next")}}>Next</button>
          <button onClick={() => {this.handleCreate()}}>Create</button>
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

  callCreateEvent = ({ classes }) => {
    return(
      <React.Fragment>
        <div className={classes.userArea}>

        <form className={classes.applyWL_formArea} onSubmit={this.handleSubmit}>
          <label className={classes.applyWL_formLabel}>Event Catogery: </label>
          <input className={classes.applyWL_formInput} id="eventCat"
            name="eventCat" type="text" value={this.state.eventCat}
            onChange={this.handleValues} />
          <br />
          <label className={classes.applyWL_formLabel}>Event Name: </label>
          <input className={classes.applyWL_formInput} id="eventName"
          name="eventName" type="text" value={this.state.eventName}
          onChange={this.handleValues} />
          <br />
          <label className={classes.applyWL_formLabel}>Event Address: </label>
          <input className={classes.applyWL_formInput} id="eventAddr"
          name="eventAddr" type="text" value={this.state.eventAddr}
          onChange={this.handleValues} />
          <br />
          <label className={classes.applyWL_formLabel}>Ticket Price: </label>
          <input className={classes.applyWL_formInput} id="ticketPrice"
          name="ticketPrice" type="number" value={this.state.ticketPrice}
          onChange={this.handleValues} />
          <br />
          <label className={classes.applyWL_formLabel}>Total Tickets: </label>
          <input className={classes.applyWL_formInput} id="totalTickets"
          name="totalTickets" type="number" value={this.state.totalTickets}
          onChange={this.handleValues} />
          <br />
          <label className={classes.applyWL_formLabel}>Start Tickets Sell: </label>
          <input className={classes.applyWL_formInput} id="saleStart"
          name="saleStart" type="datetime-local" value={this.state.saleStart}
          onChange={this.handleValues} />
          <br />
          <label className={classes.applyWL_formLabel}>End Tickets Sell: </label>
          <input className={classes.applyWL_formInput} id="saleEnd"
          name="saleEnd" type="datetime-local" value={this.state.saleEnd}
          onChange={this.handleValues} />
          <br />
          <label className={classes.applyWL_formLabel}>Event Date & Time: </label>
          <input className={classes.applyWL_formInput} id="eventDate"
          name="eventDate" type="datetime-local" value={this.state.eventDate}
          onChange={this.handleValues} />
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
    if(this.props.currentMELen===0
      || this.state.createEvent===true) {
      return this.callCreateEvent({classes});
    } else {
      return this.callDefault({classes});
    }

  }

}

ManageEvents.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  handleInvoke: PropTypes.func.isRequired
};

export default injectNOS(injectSheet(styles)(ManageEvents));
