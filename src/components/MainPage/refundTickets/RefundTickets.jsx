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



class RefundTickets extends Component {


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


      refundTickets = ({classes}) => {
          return(
            <React.Fragment>
            <div className={classes.userArea}>
              <div className={classes.heading}>
               Refund your Ticket(s)
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
                        <button>Refund Ticket(s)</button>
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

    return this.refundTickets({classes});




  }
}

RefundTickets.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  handleInvoke: PropTypes.func.isRequired,
  handleGetStorage: PropTypes.func.isRequired
};

export default injectNOS(injectSheet(styles)(RefundTickets));
