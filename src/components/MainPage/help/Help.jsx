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
            SmartT (Smart tickets) is a fully decentralized, incentivised, fast, and secure
            smart ticketing dApp solution. The smart contract of SmartT is build on top on NEO blockchain. It is using the powerfull services of nOS (Neo Operating System) and
            MCT (Master Contract Token) is the utility token for SmartT. The SmartT mainly focusing on the biggest problems of existing centralized ticketing industry.
            </div>
            <br />
            <br />
            <div className={classes.help_data}>
            <strong>Key Features of SmartT:</strong>
            <br />
            <br />
            <strong>1. Smart Earning with SmartT:</strong> One of the key feature of SmartT is Smart Earning.
            Users of SmartT dApp can earn incentives/revenues on monthly basis by using our <strong>Proof-of-Participation (PoP)</strong> mechanism.
            The users of SmartT will get equal share of MCT tokens which earned from Ads revenue mechanism. Around 50% share of advertisemetns will distributed among the SmartT users.
            <br />
            <br />
            <strong>2. Eliminate Third Parties and Zero Transaction Fee:</strong> Our state-of-art Smart Contract code enables a fully decentralized smart ticketings solution which eliminates the
            involvments of intermediary service providers and so called centralized ticketing industries. It enables peer-to-peer interaction between event organisers and ticket users.
            These third parties also charging rediculous fees for processing or purchasing tickets (for example: credit card service charges).
            SmartT dApp will also eliminates these unneccessary charges which is impossing by these intermediaries.
            Finally, thanks to NEO blockchain service which make it possible for SmartT dApp to process tickets on blockchain with <strong>"Zero Transaction Fee."</strong>
            <br />
            <br />
            <strong>3. Prevent Overpriced tickets & frauds:</strong> In current event industry it is common that sometimes users cannot
            buy tickets of a popular event on primary market, it is because of all sold-out tickets. This may happens sometimes only because of scalpers, who resale tickets
            in black market and over charging the price from users. Our SmartT dApp also prevent such type fraudulent activities by using immutable Smart tickets with unique
            identification system.
            <br />
            <br />
            <strong>4. Smart Speed of SmartT:</strong> The total credit of transaction processing speed goes to NEO blockchain.
            Becuase of 10000 TPS, the performance of SmartT dApp is incredible and the transaction confirmation speed is near seconds.
            The zero transaction cost and TPS speed of NEO is significantly make our SmartT dApp more efficient
            compare to similar dApp solutions on Ethereum and other existing plateforms.
            </div>
            <br />
            <br />
            <br />
            <div className={classes.help_heading}>
            MCT tokens requirement for SmartT:
            </div>
            <br />
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
            <br />
            <strong>2. Ticket Users:</strong> Those who wants to buy tickets directly from event organizers by using our SmartT dApp.
            The users of SmartT will be equally incentivized with 50% share of advertisements.
            <br />
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
