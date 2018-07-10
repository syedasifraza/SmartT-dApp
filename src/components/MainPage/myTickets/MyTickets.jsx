import React, {Component} from 'react';
import PropTypes from 'prop-types';
import injectSheet from "react-jss";
import { react } from "@nosplatform/api-functions";
import { u, wallet } from "@cityofzion/neon-js";
import { unhexlify, hexlify }  from "binascii";
import sjcl from "sjcl";


const { injectNOS } = react.default;



const styles = {

  label_my: {
    width: "100%",
    padding: ["12px", "0px", "12px", "0px"],
    display: "table",
    fontSize: "15px",
    resize: "vertical",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",


  },

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

    var getData;
    getData=this.props.handleGetStorage(this.props.scriptHash,
      this.props.dappHash
      +hexlify('/st/')
      +ticketHash,
      false,
      false);

    Promise.resolve(getData).then(r => {
        if(r!==null){
          this.setState({isTicket: true});
          this.setState({ticketHash: ticketHash})
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
                      <button onClick={()=>{this.handleView(d)}}>View Ticket(s)</button>
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
            }}>Back</button>
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
                      <div className={classes.row}>
                        <div className={classes.col100}>
                          <label className={classes.label_my}>{this.state.ticketHash}</label>
                        </div>
                      </div>
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
                }}>Back</button>
                </div>

              </React.Fragment>
            );
          }

  render() {
    const { classes } = this.props;

    if(this.state.changeState === "view"){
      return this.callView({classes});
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
