import React, {Component} from 'react';
import PropTypes from 'prop-types';
import injectSheet from "react-jss";
import { react } from "@nosplatform/api-functions";
import { u, wallet } from "@cityofzion/neon-js";
import { unhexlify, hexlify }  from "binascii";
import sjcl from "sjcl";
import QRTickets from "./../myTickets/QRTickets"


const { injectNOS } = react.default;



const styles = {
  refundTickets: {}

};



class CheckinTickets extends Component {

  handleSubmit = e => {
    this.props.handleInvoke(
      this.props.scriptHash,
      "transfer",
      [this.props.userAddress,
        this.props.dappHash,
        1,
        hexlify("checkinTickets"),
        e[10]],
        false).then(r => {
          this.props.clickHandler("default")
          this.props.removeTicket(e[10])
        })
  }


      checkinTickets = ({classes}) => {
          return(
            <React.Fragment>
            <div className={classes.userArea}>
              <div className={classes.heading}>
               Check-In your Ticket(s)
              </div>

              <div className={classes.container}>

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


                      <div className={classes.eventBuy}>
                        <button onClick={()=>{this.handleSubmit(d)}}>
                          Check-In Ticket(s)
                        </button>
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

  render() {
    const { classes } = this.props;

    return this.checkinTickets({classes});




  }
}

CheckinTickets.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  handleInvoke: PropTypes.func.isRequired,
  handleGetStorage: PropTypes.func.isRequired
};

export default injectNOS(injectSheet(styles)(CheckinTickets));
