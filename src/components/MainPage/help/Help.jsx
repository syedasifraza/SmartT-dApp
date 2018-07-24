import React, {Component} from 'react';
import PropTypes from 'prop-types';
import injectSheet from "react-jss";
import { react } from "@nosplatform/api-functions";


const { injectNOS } = react.default;

const styles = {
  help:{
    marginTop: "15px"
  },
  help_heading: {
    width: "100%",
    float: "left",
    textAlign: "left",
    fontSize: "25px",
    paddingTop: "5px",
    paddingBottom: "5px",
    color: "#235356"
  },
  help_data: {
    width: "100%",
    float: "left",
    textAlign: "justify",
    wordSpacing: "3px",
    fontSize: "15px",
    paddingTop: "5px",
    paddingBottom: "5px",
    color: "#000",


  },

};

class Help extends Component {

  callMain = ({classes}) => {
        return(
          <React.Fragment>
          <div className={classes.userArea}>
            <div className={classes.help}>
            </div>
            <div className={classes.container}>
            <div className={classes.help_heading}>
            Introduction of SmartT:
            </div>
            <div className={classes.help_data}>
            SmartT (Smart tickets) is a fully decentralized, user incentivized, fast, and secure
            smart ticketing dApp solution. Its smart contract is build on top on NEO blockchain. It uses the powerfull services of nOS (Neo Operating System) and
            it is using MCT (Master Contract Token) as utility token. SmartT is a fully decentralized and transparent ticketing architecture.
            </div>
            <br />
            <br />
            <br />
            <div className={classes.help_heading}>
            MCT tokens requirement for SmartT:
            </div>
            <div className={classes.help_data}>
            In order to use our SmartT dApp you must should have some MCT tokens into your wallet.
            For testing on nOSNet, we can send MCT tokens into your wallet. Please join our discord channel: https://discord.gg/wry2zf
            </div>

            <br />
            <br />
            <br />
            <div className={classes.help_heading}>
            How to Use SmartT:
            </div>
            <br />
            <div className={classes.help_data}>
            We divided our SmartT dApp mainly for three users:
            <br />
            <br />
            <strong>1. Event Organizers:</strong> Those who wants to arrange any type of events.
            <br />
            <strong>2. Ticket Users:</strong> Those who wants to buy tickets directly from event organizers by using our SmartT dApp.
            The users of SmartT will be equally incentivized with 50% share of advertisements.
            <br />
            <strong>3. Advertiser:</strong> An organization, company or an individual who want to advertise their products by using our dApp

            </div>
            <br />
            <div className={classes.help_data}>
            The <strong> Buy Tickets, My Tickets, Refund Tickets and Checkin Tickets </strong> options belong to tickets users.
            By using these options a ticket user can perform all tickets related operations.
            </div>
            <br />
            <div className={classes.help_data}>
            The <strong> Apply Whitelisting and Manage Events</strong> options on main page of SmartT is belong to event organizers.
            Before arranging any event, an organizer require to apply for a whitelisting process. Once our team approve the organizer then
            he/she can create events, claim income, verify the tickets, etc.
            </div>
            <br />
            <div className={classes.help_data}>
            The <strong> Advertisements</strong> options belongs to advertisers. They can place their advertisements in our SmartT dApp.
            The advertisements areas defined by SmartT dApp team. SmartT uses IPFS technology for storing advertisements files, but the important
            information related to advertisements is placed on NEO blockchain.
            </div>
            <br />
            <div className={classes.help_data}>
            The <strong>Whitelist Organizers</strong> options belongs to SmartT dApp owner. Once the event organizers apply for whitelisting then dApp team/owner
            will approve or disapprove Organizers by using this option.
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
    const { classes } = this.props;
    return this.callMain({classes});

  }
}

Help.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,

};

export default injectNOS(injectSheet(styles)(Help));
