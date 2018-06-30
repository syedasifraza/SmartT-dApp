import React, {Component} from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

import MainTitle from "./MainTitle";
import Button from "./Button";
import BuyTickets from "./../buyTickets/BuyTickets";
import ApplyWhitelisting from "./../applyWhitelisting/ApplyWhitelisting";

const styles = {
  middleCol: {
      height: "100%",
      float: "left",
      width: "75%",
      paddingTop: 0,
      background: "#2c3f50"
  },

  middleCol_Center: {
    height: "93%"
  },

  buttonsContainer: {
    width: "70%",
    height: "100%",
    paddingLeft: "20px",
    marginLeft: "15%"

  },
  img: {
    margin: "0px",
    padding: "0px",
    width: "60px",
    height: "60px"
  }

};

class MainScreen extends Component {
    state = {
        buy: "buy",
        buyState: false,
        my: "my",
        myState: false,
        refund: "refund",
        refundState: false,
        checkin: "checkin",
        checkinState: false,
        applyWL:"applyWL",
        applyWLState: false,
        events: "events",
        eventsState: false,
        orgWL: "orgWL",
        orgWLState: false,
        advertiser: "advertiser",
        advertiserState: false,
        help: "help",
        helpState: false
    }

    defaultStates = () => {
        this.setState({buyState: false});
        this.setState({myState: false});
        this.setState({refundState: false});
        this.setState({checkinState: false});
        this.setState({applyWLState: false});
        this.setState({eventsState: false});
        this.setState({orgWLState: false});
        this.setState({advertiserState: false});
        this.setState({helpState: false});
    }

    changeStates = (e) => {
        this.defaultStates();
        if(e === "buy"){
            var statechnaged = !this.state.buyState;
            this.setState({buyState: statechnaged});
        }
        if(e === "my"){
            this.setState({myState: true});
        }
        if(e === "refund"){
            this.setState({refundState: true});
        }
        if(e === "checkin"){
            this.setState({checkinState: true});
        }
        if(e === "applyWL"){
            this.setState({applyWLState: true});
        }
        if(e === "events"){
            this.setState({eventsState: true});
        }
        if(e === "orgWL"){
            this.setState({orgWLState: true});
        }
        if(e === "advertiser"){
            this.setState({advertiserState: true});
        }
        if(e === "help"){
            this.setState({helpState: true});
        }


    }

    callMain = ({classes}) => {
      return(
        <div className={classes.middleCol}>
          <MainTitle>SmartT Main Page</MainTitle>
          <div className={classes.middleCol_Center}>
            <div className={classes.buttonsContainer}>
              <Button clickHandler = {this.changeStates}
                title="Buy Tickets"
                check={this.state.buy}>
                <img className={classes.img}
                  src={require('./../../../img/user.png')} />
              </Button>

              <Button clickHandler = {this.changeStates}
                check={this.state.my}
                title="My Tickets">
                <img className={classes.img}
                  src={require('./../../../img/organiser.png')} />
              </Button>

              <Button clickHandler = {this.changeStates}
                check={this.state.refund}
                title="Refund Tickets">
                <img className={classes.img}
                  src={require('./../../../img/whitelist.png')} />
              </Button>

              <Button clickHandler = {this.changeStates}
                check={this.state.checkin}
                title="Check-in Tickets">
                <img className={classes.img}
                  src={require('./../../../img/advertise.png')} />
              </Button>

              <Button clickHandler = {this.changeStates}
                check={this.state.applyWL}
                title="Apply Whitelisting">
                <img className={classes.img}
                  src={require('./../../../img/about.png')} />
              </Button>

              <Button clickHandler = {this.changeStates}
                check={this.state.events}
                title="Crete Events">
                <img className={classes.img}
                  src={require('./../../../img/help.png')} />
              </Button>

              <Button clickHandler = {this.changeStates}
                check={this.state.orgWL}
                title="Whitelist Organizers">
                <img className={classes.img}
                  src={require('./../../../img/help.png')} />
              </Button>

              <Button clickHandler = {this.changeStates}
                check={this.state.advertiser}
                title="Advertisement">
                <img className={classes.img}
                  src={require('./../../../img/help.png')} />
              </Button>

              <Button clickHandler = {this.changeStates}
                check={this.state.help}
                title="Help">
                <img className={classes.img}
                  src={require('./../../../img/help.png')} />
              </Button>

            </div>
          </div>
        </div>
    );
  }

  callBuy = ({classes}) => {
    return(
      <div className={classes.middleCol}>
        <MainTitle>Buy Tickets</MainTitle>
          <div className={classes.middleCol_Center}>
            <BuyTickets clickHandler = {this.changeStates}
              check={this.state.buy} />
          </div>
      </div>

    );
  }

  callMy = ({classes}) => {
    return(
      <div className={classes.middleCol}>
        <MainTitle>My Tickets</MainTitle>
          <div className={classes.middleCol_Center}>
            <h1>Test my Tickets</h1>
          </div>
      </div>

    );
  }

  callRefund = ({classes}) => {
    return(
      <div className={classes.middleCol}>
        <MainTitle>Refund Tickets</MainTitle>
          <div className={classes.middleCol_Center}>
            <h1>test Refund Tickets</h1>
          </div>
      </div>

    );
  }

  callCheckin = ({classes}) => {
    return(
      <div className={classes.middleCol}>
        <MainTitle>Check-In Tickets</MainTitle>
          <div className={classes.middleCol_Center}>
            <h1>test checkin Tickets</h1>
          </div>
      </div>

    );
  }

  callApplyWL = ({classes}) => {
    return(
      <div className={classes.middleCol}>
        <MainTitle>Apply Whitelisting</MainTitle>
          <div className={classes.middleCol_Center}>
            <ApplyWhitelisting clickHandler = {this.changeStates}
              check={this.state.applyWL} />
          </div>
      </div>

    );
  }

  callEvents = ({classes}) => {
    return(
      <div className={classes.middleCol}>
        <MainTitle>Manage Events</MainTitle>
          <div className={classes.middleCol_Center}>
            <h1>test Manage events</h1>
          </div>
      </div>

    );
  }

  callOrgWL = ({classes}) => {
    return(
      <div className={classes.middleCol}>
        <MainTitle>Whitelist Organizers</MainTitle>
          <div className={classes.middleCol_Center}>
            <h1>test Whitelist Organizers</h1>
          </div>
      </div>

    );
  }

  callAdvertiser = ({classes}) => {
    return(
      <div className={classes.middleCol}>
        <MainTitle>Advertisements</MainTitle>
          <div className={classes.middleCol_Center}>
            <h1>test Advertisement</h1>
          </div>
      </div>

    );
  }

  callHelp = ({classes}) => {
    return(
      <div className={classes.middleCol}>
        <MainTitle>Help</MainTitle>
          <div className={classes.middleCol_Center}>
            <h1>test Help</h1>
          </div>
      </div>

    );
  }

  render()
    {
      const {classes} = this.props;
      if(this.state.buyState) {
            return this.callBuy({classes});
      } else if(this.state.myState) {
            return this.callMy({classes});
      } else if(this.state.refundState) {
            return this.callRefund({classes});
      } else if(this.state.checkinState) {
            return this.callCheckin({classes});
      } else if(this.state.applyWLState) {
            return this.callApplyWL({classes});
      } else if(this.state.eventsState) {
            return this.callEvents({classes});
      } else if(this.state.orgWLState) {
            return this.callOrgWL({classes});
      } else if(this.state.advertiserState) {
            return this.callAdvertiser({classes});
      } else if(this.state.helpState) {
            return this.callHelp({classes});
      } else {
          return this.callMain({classes});
      }

    }

}

MainScreen.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(MainScreen);
