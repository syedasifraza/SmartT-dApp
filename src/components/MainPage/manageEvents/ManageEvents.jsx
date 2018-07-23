import React, {Component} from 'react';
import PropTypes from 'prop-types';
import injectSheet from "react-jss";
import { react } from "@nosplatform/api-functions";
import { u, wallet } from "@cityofzion/neon-js";
import { unhexlify, hexlify }  from "binascii";
import QRScanner from "./QRScanner";

const { injectNOS } = react.default;

const styles = {
  ManageEvents: {}
};


class ManageEvents extends Component {

  state = {

    createEvent: false,
    eventCat: "",
    eventName: "",
    eventAddr: "",
    ticketPrice: null,
    totalTickets: null,
    saleStart: null,
    saleEnd: null,
    eventDate: null,
    index: 0,
    ticketID: null,
    verifyTickets: false,

  }

  handleValues = e => {
    this.setState({[e.target.name]: e.target.value})

  }

  handleCode = e => {
    this.setState({ticketID: e})
  }

  handleCreate = e => {
    this.setState({createEvent: true})
  }

  changeVerify = e => {
    this.setState({verifyTickets: true})
  }

  handleChange = e => {
    if(e==="next"){
      if((this.state.index + 1) < this.props.mydeployedEvents.length) {
        this.setState({index: this.state.index+1})
      }
    } else if(e==="previous"){

      if(this.state.index > 0){
        this.setState({index: this.state.index-1})
      }
    }

  }

  handleClaim = () => {

    let dateTime = new Date(Date()).getTime()/1000
    if(this.props.mydeployedEvents[this.state.index][10] > dateTime)
    {
      alert("You can only claim income of this event after the event date!")

    } else if(Number.isNaN(parseInt(this.props.mydeployedEvents[this.state.index][11])) ||
      parseInt(this.props.mydeployedEvents[this.state.index][11]) < 1){
      alert("No income found for this event!")
    } else {
      this.props.handleInvoke(
        u.reverseHex(this.props.dappHash),
        "claimIncome",
        [this.props.userAddress,
          hexlify(this.props.mydeployedEvents[this.state.index][1]),
          hexlify(this.props.mydeployedEvents[this.state.index][2])],
          false).then(r => {
            this.props.clickHandler("default")
          })

      }
  }

  handleVerify = () => {

    if(this.state.ticketID===null){
        alert("Please enter or scan ticket ID.")
    } else {
      var getData;
      getData=this.props.handleGetStorage(this.props.scriptHash,
        this.props.dappHash
        +hexlify('/st/')
        +this.state.ticketID,
        false,
        false);

      Promise.resolve(getData).then(r => {

        if(r!==null){
          let deserialized = [];
          deserialized = this.props.deserializeTickets(r)
          //console.log(deserialized)
          if(deserialized[0]==="checkedin"
            && deserialized[3]===this.props.mydeployedEvents[this.state.index][1]
            && deserialized[4]===this.props.mydeployedEvents[this.state.index][2]){
            alert("Ticket(s) found in record, Please continue with OK for parmanent verification!")
            this.props.handleInvoke(this.props.scriptHash,
              "transfer",
              [this.props.userAddress,
                this.props.dappHash,
                1,
                hexlify("verifyTickets"),
                this.state.ticketID,
                hexlify(this.props.mydeployedEvents[this.state.index][1]),
                hexlify(this.props.mydeployedEvents[this.state.index][2])
              ],
              false
            ).then(r =>{
              this.props.clickHandler("default")
              this.props.removeTicket(this.state.ticketID.substr(0, 64))
            })
          } else if(deserialized[0]==="purchased"){
            alert("Ticket(s) status is not \"Checkedin\"")
          } else if(deserialized[0]==="refunded"){
            alert("Ticket(s) already refunded and not usable!")
          } else if(deserialized[0]==="checkedin"
            && deserialized[3]!==this.props.mydeployedEvents[this.state.index][1]
            || deserialized[4]!==this.props.mydeployedEvents[this.state.index][2]){
            alert("Wrong selected event for provided ticket id!")

          } else {
            alert("Your ticket(s) already verified!")
          }

        } else {
          alert("Ticket not found!")
        }

      })

    }
  }

  handleSubmit = e => {
    e.preventDefault();
    var saleStart = new Date(this.state.saleStart).getTime()/1000
    var saleEnd = new Date(this.state.saleEnd).getTime()/1000
    var eventDate = new Date(this.state.eventDate).getTime()/1000
    if(saleEnd <= saleStart ){
      alert("Event's end date/time wrong!")
    } else if(eventDate < saleEnd){
      alert("Event's date/time should be equal or greater then event's Sell End!")
    } else {
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
            u.int2hex(saleStart))),
          String(u.reverseHex(
            u.int2hex(saleEnd))),
          String(u.reverseHex(
            u.int2hex(eventDate)))],
          false)
    }    

  }


  eventsList = ({classes}) => {
    return(
      <React.Fragment>
      <div className={classes.userArea}>
      <div className={classes.heading}>
        Event #: <label> {this.state.index + 1}/{this.props.mydeployedEvents.length}</label>
      </div>
      <div className={classes.container}>



        <div className={classes.eventBuy}>

          <button className={classes.changeButton}
            onClick={() => {this.handleChange("previous")}}>Previous</button>

          <button className={classes.changeButton}
            onClick={() => {this.handleCreate()}}>Create Event</button>
          <button className={classes.changeButton}
            onClick={() => {this.handleClaim()}}>Claim Income</button>
          <button className={classes.changeButton}
            onClick={() => {this.changeVerify()}}>Verify Tickets</button>

          <button className={classes.changeButton}
            onClick={() => {this.handleChange("next")}}>Next</button>
        </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Event Category:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.mydeployedEvents[this.state.index][1]}
                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Event Title:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.mydeployedEvents[this.state.index][2]}
                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Event Venue/Address:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.mydeployedEvents[this.state.index][3]}
                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Ticket Price (MCT):</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.mydeployedEvents[this.state.index][4]/100000000}
                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Total Tickets:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.mydeployedEvents[this.state.index][5]}
                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Available Tickets:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.mydeployedEvents[this.state.index][6]}
                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Tickets Sold:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.mydeployedEvents[this.state.index][7]}
                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Tickets Sell from:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.getDateTime(
                this.props.mydeployedEvents[this.state.index][8])}

                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Tickets Sell to:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.getDateTime(
                this.props.mydeployedEvents[this.state.index][9])}

                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Event Date/Time:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.getDateTime(
                this.props.mydeployedEvents[this.state.index][10])}

                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Total Income (MCT):</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.mydeployedEvents[this.state.index][11]/100000000}

                </label>
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
                <label className={classes.label}>Event Category:</label>
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
                <label className={classes.label}>Event Title:</label>
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
                <label className={classes.label}>Event Venue/Address:</label>
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
                <label className={classes.label}>Ticket Price (MCT):</label>
              </div>
              <div className={classes.col75}>
                <input className={classes.input}
                  id="ticketPrice"
                  name="ticketPrice"
                  type="number"
                  value={this.state.ticketPrice}
                  onChange={this.handleValues}
                  placeholder="Required field..."
                  min="0"
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
                  min="0"
                  required />
              </div>
            </div>

            <div className={classes.row}>
              <div className={classes.col25}>
                <label className={classes.label}>Tickets Sell from:</label>
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
                <label className={classes.label}>Tickets Sell to:</label>
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
                <label className={classes.label}>Transcation Charges (MCT):</label>
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

  verifyTickets = ({ classes }) => {
    return(
      <React.Fragment>
        <div className={classes.userArea}>
        <div className={classes.heading}>
          Tickets Verification Process
        </div>
        <div className={classes.container}>
          <div className={classes.row}>

            <div className={classes.col95}>
              <input className={classes.input}
                id="ticketID"
                name="ticketID"
                type="text"
                value={this.state.ticketID}
                onChange={this.handleValues}
                placeholder="Enter ticket Id or scan by using QR code..."
                required />
            </div>

          </div>
          <div className={classes.eventBuy}>

              <button className={classes.changeButton}
                onClick={() => {this.handleVerify()}}>Submit</button>

              <QRScanner classes={classes}
                handleCode={this.handleCode}/>

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
    if(this.props.mydeployedEvents.length===0
      || this.state.createEvent===true) {
      return this.createEvent({classes});
    } else if(this.state.verifyTickets===true){
      return this.verifyTickets({classes});
    } else {
      return this.eventsList({classes});
    }

  }

}

ManageEvents.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  handleInvoke: PropTypes.func.isRequired,
  handleGetStorage: PropTypes.func.isRequired
};

export default injectNOS(injectSheet(styles)(ManageEvents));
