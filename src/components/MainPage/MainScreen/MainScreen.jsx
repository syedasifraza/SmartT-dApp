import React, {Component} from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

import MainTitle from "./MainTitle";
import Button from "./Button";
import UserScreen from "./../userScreen/userScreen";

const styles = {
  middleCol: {
      height: "100%",
      float: "left",
      width: "75%",
      paddingTop: 0,
      background: "#2c3f50"
  },

  middleCol_Center: {
    height: "91%"
  },

  buttonsContainer: {
    width: "70%",
    height: "100%",
    paddingLeft: "50px",
    marginRight: "700px",
    marginLeft: "125px"
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
        user: "user",
        userState: false,
        organiser: "organiser",
        organiserState: false,
        whitelist: "whitelist",
        whitelistState: false,
        advertiser: "advertiser",
        advertiserState: false,
        about:"about",
        aboutState: false,
        help: "help",
        helpState: false
    }

    defaultStates = () => {
        this.setState({userState: false});
        this.setState({organiserState: false});
        this.setState({whitelistState: false});
        this.setState({advertiserState: false});
        this.setState({aboutState: false});
        this.setState({helpState: false});
    }

    changeStates = (e) => {
        this.defaultStates();
        if(e === "user"){
            var statechnaged = !this.state.userState;
            this.setState({userState: statechnaged});
        }
        if(e === "organiser"){
            this.setState({organiserState: true});
        }
        if(e === "whitelist"){
            this.setState({whitelistState: true});
        }
        if(e === "advertiser"){
            this.setState({advertiserState: true});
        }
        if(e === "about"){
            this.setState({aboutState: true});
        }
        if(e === "help"){
            this.setState({helpState: true});
        }

        console.log(this.state.userState);
        console.log(this.state.organiserState);
        console.log(this.state.whitelistState);
        console.log(this.state.advertiserState);
        console.log(this.state.aboutState);
        console.log(this.state.helpState);

    }

    callMain = ({classes}) => {
      return(
        <div className={classes.middleCol}>
          <MainTitle />
          <div className={classes.middleCol_Center}>
            <div className={classes.buttonsContainer}>
              <Button clickHandler = {this.changeStates}
                title="Ticket User"
                check={this.state.user}>
                <img className={classes.img}
                  src={require('./../../../img/user.png')} />
              </Button>

              <Button clickHandler = {this.changeStates}
                check={this.state.organiser}
                title="Ticket organiser">
                <img className={classes.img}
                  src={require('./../../../img/organiser.png')} />
              </Button>

              <Button clickHandler = {this.changeStates}
                check={this.state.whitelist}
                title="Organiser Whitelist">
                <img className={classes.img}
                  src={require('./../../../img/whitelist.png')} />
              </Button>

              <Button clickHandler = {this.changeStates}
                check={this.state.advertiser}
                title="Advertiser">
                <img className={classes.img}
                  src={require('./../../../img/advertise.png')} />
              </Button>

              <Button clickHandler = {this.changeStates}
                check={this.state.about}
                title="About US">
                <img className={classes.img}
                  src={require('./../../../img/about.png')} />
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

  callUser = ({classes}) => {
    return(
      <div className={classes.middleCol}>
        <UserScreen clickHandler = {this.changeStates}
          check={this.state.user} />
      </div>

    );
  }

  callOrganiser = ({classes}) => {
    return(
      <div className={classes.middleCol}>
        <h1>test Organiser</h1>
      </div>

    );
  }

  callWhitelist = ({classes}) => {
    return(
      <div className={classes.middleCol}>
        <h1>test Whitelist</h1>
      </div>

    );
  }

  callAdvertiser = ({classes}) => {
    return(
      <div className={classes.middleCol}>
        <h1>test Advertiser</h1>
      </div>

    );
  }

  callAbout = ({classes}) => {
    return(
      <div className={classes.middleCol}>
        <h1>test About</h1>
      </div>

    );
  }

  callHelp = ({classes}) => {
    return(
      <div className={classes.middleCol}>
        <h1>test Help</h1>
      </div>

    );
  }

  render()
    {
      const {classes} = this.props;
      if(this.state.userState) {
            return this.callUser({classes});
      } else if(this.state.organiserState) {
            return this.callOrganiser({classes});
      } else if(this.state.whitelistState) {
            return this.callWhitelist({classes});
      } else if(this.state.advertiserState) {
            return this.callAdvertiser({classes});
      } else if(this.state.aboutState) {
            return this.callAbout({classes});
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
