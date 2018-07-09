import React, {Component} from 'react';
import PropTypes from 'prop-types';
import injectSheet from "react-jss";
import { react } from "@nosplatform/api-functions";
import { u, wallet } from "@cityofzion/neon-js";
import { unhexlify, hexlify }  from "binascii";
import sjcl from "sjcl";


const { injectNOS } = react.default;



const styles = {

con: {
    borderRadius: ["0px","0px", "5px", "5px"],
    backgroundColor: "#ccc",
    padding: "0px",
    margin: "20px",
    marginTop: "0px",
    color: "#2c3f50",
    fontFamily: "sans-serif",

  },
outer_box: {
    width: "30%",
    margin:"10px",
    float: "left",
    wordWrap: "break-word",
    border:["2px", "solid", "#fff"],
    background:"linear-gradient(to top, #5CA571, #ddd)",
    borderRadius: "5px",
    marginBottom: "20px",
    marginTop: "20px",
},
eventDetails: {
  width: "100%",
  float: "left",
  paddingTop: "10px",
  paddingBottom: "10px",
  textAlign: "center",
  fontSize: "17px",
  borderBottom: ["1px", "solid", "#fff"],
  backgroundColor: "#aaa"

},

eventCat: {
  width: "100%",
  paddingTop: "10px",
  paddingBottom: "10px",
  float: "left",
  textAlign: "center",
  fontSize: "15px"
},
eventName: {
  width: "100%",
  float: "left",
  textAlign: "center",
  fontSize: "15px",
  borderTop: ["1px", "solid", "#fff"],
  borderBottom: ["1px", "solid", "#fff"],
  paddingTop: "15px",
  paddingBottom: "15px"
},
eventAddress: {
  width: "100%",
  float: "left",
  textAlign: "center",
  fontSize: "15px",
  borderBottom: ["1px", "solid", "#fff"],
  paddingTop: "15px",
  paddingBottom: "15px"
},
eventBuy: {
  width: "100%",
  float: "left",
  textAlign: "center",
  fontSize: "15px",
  paddingTop: "5px",
  paddingBottom: "5px"
}


};




class BuyTickets extends Component {


  state = {
    changeState: "events",
    currentCat: "",
    currentTitle: "",
    currentAddress: "",
    currentPrice: null,
    currentAvail: null,
    tickets: null,
    password: null,
    totalPrice: null,

  }

  handleSubmit = e => {
    e.preventDefault();
    var hashConcat = this.props.userAddress
      +this.state.currentAddress
      +this.state.currentCat
      +this.state.currentTitle
      +this.state.password
    console.log(hashConcat);
    var ticketHash = sjcl.codec.hex.fromBits(
      sjcl.hash.sha256.hash(hashConcat)
    )
    console.log(ticketHash);

    this.props.handleInvoke(
      this.props.scriptHash,
      "transfer",
      [this.props.userAddress,
        this.props.dappHash,
        parseInt(this.state.totalPrice)*100000000,
        hexlify("buyTickets"),
        this.state.currentAddress,
        hexlify(this.state.currentCat),
        hexlify(this.state.currentTitle),
        parseInt(this.state.tickets),
        ticketHash],
        false)

  }

  handleStatus = (e) => {
    this.setState({changeState: e});

  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
    if(e.target.name==="tickets") {
      this.setState({totalPrice:
        (e.target.value * this.state.currentPrice)})
    }

  }

  handleBuy = (e) => {
    if(e[6]!==0){
      this.setState({currentAddress: e[0]},
      () => this.setState({currentCat: e[1]},
      () => this.setState({currentTitle: e[2]},
      () => this.setState({currentPrice: e[4]/100000000},
      () => this.setState({currentAvail: e[6]},
      () => this.setState({changeState: "buy"}
      ))))));


    } else {
      alert("All tickets sold!")
    }


  }

  callMain = ({classes}) => {
        return(
          <React.Fragment>
          <div className={classes.userArea}>
          <div className={classes.heading}>
          List of Events
          </div>
            <div className={classes.con}>
            {
              this.props.deserialized.map((d, index) => {
                return(
                <div>
                  <div className={classes.outer_box}>
                    <div className={classes.eventDetails}>
                      Active Event
                    </div>
                    <div className={classes.eventCat}>
                    <strong>Event Catogery: </strong> {d[1]}
                    </div>
                    <div className={classes.eventName}>
                    <strong>Event Title: </strong>
                    {d[2]}
                    </div>
                    <div className={classes.eventAddress}>
                    <strong>Event Address: </strong> {d[3]}
                    <br />
                    <br />
                    <strong>Event Date: </strong> {d[10]}
                    </div>
                    <div className={classes.eventBuy}>
                      <button onClick={()=>{this.handleBuy(d)}}>Buy Tickets</button>
                    </div>
                  </div>

                </div>


                )
              })
            }
            </div>


              <div className={classes.con}>
              {
                this.props.deserialized_upcoming.map((u, index) => {
                  return(
                  <div>
                    <div className={classes.outer_box}>
                    <div className={classes.eventDetails}>
                      Upcoming Event
                    </div>

                      <div className={classes.eventCat}>
                      <strong>Event Catogery: </strong> {u[1]}
                      </div>
                      <div className={classes.eventName}>
                      <strong>Event Title: </strong>
                      {u[2]}
                      </div>
                      <div className={classes.eventAddress}>
                      <strong>Event Address: </strong> {u[3]}
                      <br />
                      <br />
                      <strong>Event Date: </strong> {u[10]}
                      </div>
                      <div className={classes.eventBuy}>
                        Start on: {u[8]}
                      </div>
                    </div>

                  </div>


                  )
                })
              }
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


      callBuy= ({classes}) => {
        return(
          <React.Fragment>
          <div className={classes.userArea}>
          <div className={classes.heading}>
            Buy Tickets Form
          </div>
          <div className={classes.container}>
            <form onSubmit={this.handleSubmit}>
              <div className={classes.row}>
                <div className={classes.col25}>
                  <label className={classes.label}>Your Wallet Address:</label>
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
                  <label className={classes.label}>Event Catogery:</label>
                </div>
                <div className={classes.col75}>
                  <label className={classes.label2}>
                  {this.state.currentCat}
                    </label>
                </div>
              </div>

              <div className={classes.row}>
                <div className={classes.col25}>
                  <label className={classes.label}>Event Title:</label>
                </div>
                <div className={classes.col75}>
                  <label className={classes.label2}>
                  {this.state.currentTitle}
                    </label>
                </div>
              </div>

              <div className={classes.row}>
                <div className={classes.col25}>
                  <label className={classes.label}>Ticket Price (in MCT):</label>
                </div>
                <div className={classes.col75}>
                  <label className={classes.label2}>
                  {this.state.currentPrice}
                    </label>
                </div>
              </div>

              <div className={classes.row}>
                <div className={classes.col25}>
                  <label className={classes.label}>Available Tickets:</label>
                </div>
                <div className={classes.col75}>
                  <label className={classes.label2}>
                  {this.state.currentAvail}
                    </label>
                </div>
              </div>

              <div className={classes.row}>
                <div className={classes.col25}>
                  <label className={classes.label}>Number of Tickets:</label>
                </div>
                <div className={classes.col75}>
                  <input className={classes.input}
                    type="text" id="tickets"
                    name="tickets"
                    placeholder="Enter number of tickets you want to buy..."
                    value={this.state.tickets}
                    onChange={this.handleChange}
                    required />
                </div>
              </div>

              <div className={classes.row}>
                <div className={classes.col25}>
                  <label className={classes.label}>Enter Password:</label>
                </div>
                <div className={classes.col75}>
                  <input className={classes.input}
                    type="password" id="password"
                    name="password"
                    placeholder="Enter a unique Password for your ticket order..."
                    value={this.state.password}
                    onChange={this.handleChange}
                    required />
                </div>
              </div>

              <div className={classes.row}>
                <div className={classes.col25}>
                  <label className={classes.label}>Total (in MCT):</label>
                </div>
                <div className={classes.col75}>
                  <label className={classes.label2}>
                  {this.state.totalPrice}
                    </label>
                </div>
              </div>


              <div className={classes.row}>
                  <input className={classes.submit_btn}
                    type="submit" value="Buy Tickets" />
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
    const { classes } = this.props;
    if(this.state.changeState === "buy"){
      return this.callBuy({classes});
    } else {
      return this.callMain({classes});
    }

  }
}

BuyTickets.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  handleInvoke: PropTypes.func.isRequired
};

export default injectNOS(injectSheet(styles)(BuyTickets));
