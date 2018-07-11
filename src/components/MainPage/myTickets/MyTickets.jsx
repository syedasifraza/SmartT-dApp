import React, {Component} from 'react';
import PropTypes from 'prop-types';
import injectSheet from "react-jss";
import { react } from "@nosplatform/api-functions";
import { u, wallet } from "@cityofzion/neon-js";
import { unhexlify, hexlify }  from "binascii";
import sjcl from "sjcl";
import QRTickets from "./QRTickets"


const { injectNOS } = react.default;



const styles = {

  unlock: {
    width: "100%",
    marginLeft: "40px",
    padding: "10px",
    display: "table",
    fontSize: "12px",
    resize: "vertical",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: "4px",
    border: ["1px", "solid", "#ccc"],
    background: "#3CB371",
    '&:hover': {
      cursor: "pointer",
      background: "#2c8e75"
    }

  },


};



class MyTickets extends Component {


  state = {
    changeState: "",
    isTicket: false,
    currentCat: "",
    currentTitle: "",
    currentAddress: "",
    password: null,
    ticketHash: null,
    ticketStatus: null,
    ticketQty: null,


  }


  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})

  }

  handleView = (e) => {
    this.setState({currentAddress: e[0]},
    () => this.setState({currentCat: e[1]},
    () => this.setState({currentTitle: e[2]},
    () => this.setState({changeState: "view"}
    ))));

  }

  handleMain = (e) => {
    this.setState({changeState: "main"})

  }

  handleViewAll = (e) => {
    if(this.props.myTickets.length!==0){
      this.setState({changeState: e})
      this.setState({isTicket: false})
      this.setState({password: null})
    } else {
      alert("Please unlock your tickets first!")
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    var hashConcat = this.props.userAddress
      +this.state.currentAddress
      +this.state.currentCat
      +this.state.currentTitle
      +this.state.password

    var ticketHash = sjcl.codec.hex.fromBits(
      sjcl.hash.sha256.hash(hashConcat)
    )

    var getData;
    getData=this.props.handleGetStorage(this.props.scriptHash,
      this.props.dappHash
      +hexlify('/st/')
      +ticketHash,
      false,
      false);

    Promise.resolve(getData).then(r => {
        if(r!==null){
          let deserialized = [];
          deserialized = this.props.deserializeTickets(r)
          let p = deserialized.slice()
          p.push(ticketHash)
          if(deserialized[0]==="purchased"){
            p.push(true)
          } else {
            p.push(false)
          }
          deserialized = p;
          this.props.addTickets(deserialized);
          this.setState({ticketHash: ticketHash},
          () => this.setState({ticketStatus: deserialized[0]},
          () => this.setState({ticketQty: deserialized[4]},
          () => this.setState({isTicket: true})
          )))



        } else {
          alert("Ticket not found!")
        }
      });
  }

  callMain = ({classes}) => {
        return(
          <React.Fragment>
          <div className={classes.userArea}>
            <div className={classes.heading}>
             Unlock and View your Event(s) Ticket(s)
            </div>
            <div className={classes.container}>
            <div className={classes.eventBuy}>
              <button onClick={()=>{this.handleViewAll("viewall")}}>View All Ticket(s)</button>
            </div>
            {
              this.props.deserialized.map((d, index) => {
                return(
                <React.Fragment>
                  <div className={classes.col30}>
                    <div className={classes.eventDetails}>
                      Event Catogery:
                      <strong> {d[1]} </strong>
                    </div>

                    <div className={classes.eventName}>
                      Event Title:
                      <strong> {d[2]} </strong>
                    </div>

                    <div className={classes.eventBuy}>
                      <button onClick={()=>{this.handleView(d)}}>Unlock Ticket(s)</button>
                    </div>
                  </div>
                </React.Fragment>

                )
              })
            }

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


      callView = ({classes}) => {
            return(
              <React.Fragment>
              <div className={classes.userArea}>
                <div className={classes.heading}>
                 View Ticket(s)
                </div>

                <div className={classes.container}>
                  <div className={classes.eventBuy}>
                    <button onClick={()=>{this.handleMain("main")}}>
                    Back</button>
                  </div>
                  <form onSubmit={this.handleSubmit}>
                    <div className={classes.row}>
                      <div className={classes.col25}>
                        <label className={classes.label_my}>Ticket(s) Password:</label>
                      </div>
                      <div className={classes.col40}>
                        <input className={classes.input}
                          type="password" id="password"
                          name="password"
                          placeholder="Please enter your ticket(s) password..."
                          value={this.state.password}
                          onChange={this.handleChange}
                          required />
                      </div>
                      <div className={classes.col20}>
                        <input className={classes.unlock}
                          type="submit" value="Unlock Ticket(s)" />
                      </div>

                    </div>
                    {
                      this.state.isTicket ?
                      <QRTickets ticketHash={this.state.ticketHash}
                        currentCat={this.state.currentCat}
                        currentTitle={this.state.currentTitle}
                        eventAddress="Yusang-gu, Nangda-ro, S.Korea"
                        eventDate="2018/09/10 10:00 PM"
                        ticketStatus={this.state.ticketStatus}
                        ticketQty={this.state.ticketQty}
                        ticketPrice="50"
                        orderDate="2016/01/10 20:00 PM"
                        classes={classes}
                        />

                      :null
                    }
                    <div className={classes.row}>

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

      callViewAll = ({classes}) => {
            return(
              <React.Fragment>
              <div className={classes.userArea}>
                <div className={classes.heading}>
                 All Unlocked Ticket(s)
                </div>

                <div className={classes.container}>
                  <div className={classes.eventBuy}>
                    <button onClick={()=>{this.handleViewAll("main")}}>
                    Back</button>
                  </div>
                  {
                    this.props.myTickets.map((d, index) => {
                      return(
                      <React.Fragment>
                        <QRTickets ticketHash={d[6]}
                          currentCat={d[2]}
                          currentTitle={d[3]}
                          eventAddress="Yusang-gu, Nangda-ro, S.Korea"
                          eventDate="2018/09/10 10:00 PM"
                          ticketStatus={d[0]}
                          ticketQty={d[4]}
                          ticketPrice="50"
                          orderDate="2016/01/10 20:00 PM"
                          classes={classes}
                          />
                      </React.Fragment>

                      )
                    })
                  }


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
    const { classes } = this.props;

    if(this.state.changeState === "view"){
      return this.callView({classes});
    } else if(this.state.changeState === "viewall"){
      return this.callViewAll({classes});
    } else {
      return this.callMain({classes});
    }



  }
}

MyTickets.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  handleInvoke: PropTypes.func.isRequired,
  handleGetStorage: PropTypes.func.isRequired
};

export default injectNOS(injectSheet(styles)(MyTickets));
