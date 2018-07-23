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
  mytickets:{}

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
    ticketPrice: null,
    orderDate: null,
    eventAddress: null,
    eventDate: null,
    incentive: 0,

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

  handleVerified = (e) => {
    if(this.props.verifiedTickets.length!==0){
      var i;
      for(i=0; i < this.props.verifiedTickets.length; i++){
        if(!Number.isNaN(parseInt(this.props.verifiedTickets[i][10]))){
          this.setState({incentive: this.state.incentive +
            parseInt(this.props.verifiedTickets[i][10])})
        }

      }
      this.setState({changeState: e})
      this.setState({isTicket: false})
      this.setState({password: null})
    } else {
      alert("No verified tickets found!")
    }
  }

  handleAdsClaim = e => {
    if(this.state.incentive > 0){
      this.props.handleInvoke(
        u.reverseHex(this.props.dappHash),
        "claimIncentive",
        [this.props.userAddress],
          false).then(r => {
            this.props.clickHandler("default")
          })
    } else {
      alert("Sorry! Your current claim incentive is zero!")
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
      +ticketHash
      +this.props.userAddress,
      false,
      false);

    Promise.resolve(getData).then(r => {
        if(r!==null){
          let deserialized = [];
          deserialized = this.props.deserializeTickets(r)
          let p = deserialized.slice()
          p.push(ticketHash)
          deserialized = p;
          this.props.addTickets(deserialized);
          this.setState({ticketHash: ticketHash},
          () => this.setState({ticketStatus: deserialized[0]},
          () => this.setState({ticketQty: deserialized[6]},
          () => this.setState({eventAddress: deserialized[5]},
          () => this.setState({eventDate: deserialized[8]},
          () => this.setState({orderDate: deserialized[9]},
          () => this.setState({ticketPrice: deserialized[7]},
          () => this.setState({isTicket: true})
          )))))))

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
             Unlock and View Ticket(s)
            </div>
            <div className={classes.container}>
            <div className={classes.eventBuy}>
              <button className={classes.myTkt_btn}
                onClick={()=>{this.handleViewAll("viewall")}}>
                All Unlocked Ticket(s)</button>
              <button className={classes.myTkt_btn}
                onClick={()=>{this.handleVerified("verified")}}>
                All Verified Ticket(s)</button>
            </div>
            {
              this.props.deserialized.map((d, index) => {
                return(
                <React.Fragment>
                  <div className={classes.col30}>
                    <div className={classes.eventDetails}>
                      Event Category:
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
                 Unlock Ticket(s)
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
                      <QRTickets ticketHash={this.state.ticketHash+this.props.userAddress}
                        currentCat={this.state.currentCat}
                        currentTitle={this.state.currentTitle}
                        eventAddress={this.state.eventAddress}
                        eventDate={this.props.getDateTime(this.state.eventDate)}
                        ticketStatus={this.state.ticketStatus}
                        ticketQty={this.state.ticketQty}
                        ticketPrice={this.state.ticketPrice/100000000}
                        orderDate={this.props.getDateTime(this.state.orderDate)}
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
                        <QRTickets ticketHash={d[10]+this.props.userAddress}
                          currentCat={d[3]}
                          currentTitle={d[4]}
                          eventAddress={d[5]}
                          eventDate={this.props.getDateTime(d[8])}
                          ticketStatus={d[0]}
                          ticketQty={d[6]}
                          ticketPrice={d[7]/100000000}
                          orderDate={this.props.getDateTime(d[9])}
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

          callVerified = ({classes}) => {
                return(
                  <React.Fragment>
                  <div className={classes.userArea}>
                    <div className={classes.heading}>
                     All Verified Ticket(s)
                    </div>

                    <div className={classes.container}>
                      <div className={classes.eventBuy}>
                        <button className={classes.myTkt_btn}
                          onClick={()=>{this.handleVerified("main")}}>
                          Back</button>
                        <button className={classes.myTkt_btn}
                          onClick={()=>{this.handleAdsClaim()}}>
                          Claim Incentive: {this.state.incentive}</button>
                      </div>
                      {
                        this.props.verifiedTickets.map((d, index) => {
                          return(
                          <React.Fragment>
                            <QRTickets ticketHash={d[11]}
                              currentCat={d[3]}
                              currentTitle={d[4]}
                              eventAddress={d[5]}
                              eventDate={this.props.getDateTime(d[8])}
                              ticketStatus={d[0]}
                              ticketQty={d[6]}
                              ticketPrice={d[7]/100000000}
                              orderDate={this.props.getDateTime(d[9])}
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
    } else if(this.state.changeState === "verified"){
      return this.callVerified({classes});
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
