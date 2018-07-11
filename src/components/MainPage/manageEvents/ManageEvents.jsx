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


  eventsList = ({classes}) => {
    return(
      <React.Fragment>
      <div className={classes.userArea}>
      <div className={classes.heading}>
        Your Events List
      </div>
      <div className={classes.container}>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Event Catogery:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.currentCat}
                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Event Name:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.currentName}
                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Event Address:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.currentAddr}
                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Ticket Price:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.currentPrice}
                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Total Tickets:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.currentTotal}
                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Available Tickets:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.currentAvail}
                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Tickets Sold:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.currentSold}
                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Start Sell:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.currentStart}

                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>End Sell:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.currentEnd}

                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Event Date/Time:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.currentEventTime}

                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Total Income:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.currentIncome/100000000}

                </label>
            </div>
          </div>

          <div className={classes.row}>

          <div className={classes.col25}>
            <label>{this.props.currentMEIndex + 1}/{this.props.currentMELen}</label>
          </div>
          <div className={classes.col75}>

            <button className={classes.changeButton}
              onClick={() => {this.handleChange("previous")}}>Previous</button>

            <button className={classes.changeButton}
              onClick={() => {this.handleCreate()}}>Create Event</button>

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


  createEvent = ({ classes }) => {
    return(
      <React.Fragment>
        <div className={classes.userArea}>
        <div className={classes.heading}>
          New Event Form
        </div>
        <div className={classes.container}>
          <form onSubmit={this.handleSubmit}>
            <div className={classes.row}>
              <div className={classes.col25}>
                <label className={classes.label}>Event Catogery:</label>
              </div>
              <div className={classes.col75}>
                <input className={classes.input}
                  id="eventCat"
                  name="eventCat"
                  type="text"
                  value={this.state.eventCat}
                  onChange={this.handleValues}
                  placeholder="Required field..."
                  required />
              </div>
            </div>

            <div className={classes.row}>
              <div className={classes.col25}>
                <label className={classes.label}>Event Name:</label>
              </div>
              <div className={classes.col75}>
                <input className={classes.input}
                  id="eventName"
                  name="eventName"
                  type="text"
                  value={this.state.eventName}
                  onChange={this.handleValues}
                  placeholder="Required field..."
                  required />
              </div>
            </div>

            <div className={classes.row}>
              <div className={classes.col25}>
                <label className={classes.label}>Event Address:</label>
              </div>
              <div className={classes.col75}>
                <input className={classes.input}
                  id="eventAddr"
                  name="eventAddr"
                  type="text"
                  value={this.state.eventAddr}
                  onChange={this.handleValues}
                  placeholder="Required field..."
                  required />
              </div>
            </div>

            <div className={classes.row}>
              <div className={classes.col25}>
                <label className={classes.label}>Ticket Price:</label>
              </div>
              <div className={classes.col75}>
                <input className={classes.input}
                  id="ticketPrice"
                  name="ticketPrice"
                  type="number"
                  value={this.state.ticketPrice}
                  onChange={this.handleValues}
                  placeholder="Required field..."
                  required />
              </div>
            </div>

            <div className={classes.row}>
              <div className={classes.col25}>
                <label className={classes.label}>Total Tickets:</label>
              </div>
              <div className={classes.col75}>
                <input className={classes.input}
                  id="totalTickets"
                  name="totalTickets"
                  type="number"
                  value={this.state.totalTickets}
                  onChange={this.handleValues}
                  placeholder="Required field..."
                  required />
              </div>
            </div>

            <div className={classes.row}>
              <div className={classes.col25}>
                <label className={classes.label}>Start Sell:</label>
              </div>
              <div className={classes.col75}>
                <input className={classes.input}
                  id="saleStart"
                  name="saleStart"
                  type="datetime-local"
                  value={this.state.saleStart}
                  onChange={this.handleValues}
                  placeholder="Required field..."
                  required />
              </div>
            </div>

            <div className={classes.row}>
              <div className={classes.col25}>
                <label className={classes.label}>End Sell:</label>
              </div>
              <div className={classes.col75}>
                <input className={classes.input}
                  id="saleEnd"
                  name="saleEnd"
                  type="datetime-local"
                  value={this.state.saleEnd}
                  onChange={this.handleValues}
                  placeholder="Required field..."
                  required />
              </div>
            </div>

            <div className={classes.row}>
              <div className={classes.col25}>
                <label className={classes.label}>Event Date/Time:</label>
              </div>
              <div className={classes.col75}>
                <input className={classes.input}
                  id="eventDate"
                  name="eventDate"
                  type="datetime-local"
                  value={this.state.eventDate}
                  onChange={this.handleValues}
                  placeholder="Required field..."
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
        }}>Home</button>
        </div>
      </React.Fragment>
    );
  }

  render() {
    const {classes} = this.props;
    if(this.props.currentMELen===0
      || this.state.createEvent===true) {
      return this.createEvent({classes});
    } else {
      return this.eventsList({classes});
    }

  }

}

ManageEvents.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  handleInvoke: PropTypes.func.isRequired
};

export default injectNOS(injectSheet(styles)(ManageEvents));
