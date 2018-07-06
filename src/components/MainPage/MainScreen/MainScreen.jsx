import React, {Component} from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import { react } from "@nosplatform/api-functions";
import { u, wallet } from "@cityofzion/neon-js";
import { unhexlify, hexlify }  from "binascii";

import MainTitle from "./MainTitle";
import Button from "./Button";
import BuyTickets from "./../buyTickets/BuyTickets";
import ApplyWhitelisting from "./../applyWhitelisting/ApplyWhitelisting";
import WhitelistOrganizers from "./../whitelistOrganizers/WhitelistOrganizers";
import ManageEvents from "./../manageEvents/ManageEvents";


const { injectNOS, nosProps } = react.default;


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
  },

  userArea: {
    height: "97%",
    overflowY: "auto",
    overflowX: "hidden"
  },

  buttonArea: {
    hieght: "3.2%",
    display: "flex",
    justifyContent: "center",
    borderTop: "solid",
    borderColor: "#fff",
    paddingTop: "2px"

  },
  homeButton: {
    width: "10%",
    color: "#000"

  },
  applyWL_formArea: {
    paddingTop: "80px",
    marginLeft:"250px"

  },
  applyWL_formLabel: {
    color: "#fff",
    paddingRight: "10px"
  },
  applyWL_formInput: {
    margin: "30px"
  }

};

class MainScreen extends Component {
      handleAlert = async func => alert(await func);

      handleGetStorage = async (scriptHash, key, encodeInput, decodeOutput)
          => this.props.nos
               .getStorage({ scriptHash, key, encodeInput, decodeOutput})
               .catch(err => alert('Error: ${err.message}'));

      handleInvoke = async (scriptHash, operation, args, encodeArgs)
          => this.props.nos
               .invoke({ scriptHash, operation, args, encodeArgs })
               .then(txid => alert(`Invoke txid: ${txid} `))
               .catch(err => alert('Error: ${err.message}'));

      // handleGetAddress = async () => alert(await this.props.nos.getAddress());

      handleClaimGas = () =>
        this.props.nos
          .claimGas()
          .then(alert)
          .catch(alert);


      getDateTime = unixTimestamp => {
          const date = new Date(unixTimestamp * 1000);
          const hours = date.getHours();
          const minutes = `0${date.getMinutes()}`;
          const seconds = `0${date.getSeconds()}`;
          return `${date.toLocaleDateString()} ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
      };



      // deserialized for applyWhitelist
      deserialize = (rawData, key) => {

      const rawSplitted = rawData.match(/.{2}/g);

      const arrayLen_outer = parseInt(rawSplitted[1], 16);
      let offset = 2;
      const rawArray_outer = [];

      for (let j=0; j < arrayLen_outer; j += 1) {
        const arrayLen = parseInt(rawSplitted[offset+1], 16);

        offset = offset + 2;
        const rawArray = [];

      for (let i = 0; i < arrayLen; i += 1) {

        const itemType = parseInt(rawSplitted[offset], 16);
        offset += 1;

        let itemLength = parseInt(rawSplitted[offset], 16);
        offset += 1;
        if (itemLength === 253) {
          itemLength = parseInt(
            u.reverseHex(
              this.concatBytes(rawSplitted, offset, offset + 2)), 16);

          offset += 2;

        } else if (itemLength === 254) {
          itemLength = parseInt(
            u.reverseHex(
              this.concatBytes(rawSplitted, offset, offset + 2)), 16);

          offset += 4;

        } else if (itemLength === 255) {
          itemLength = parseInt(
            u.reverseHex(
              this.concatBytes(rawSplitted, offset, offset + 2)), 16);

          offset += 8;

        } else {

        }

        let data = this.concatBytes(rawSplitted, offset, itemLength + offset);

        if(key==="applyWhitelist"){
          if (i === 6 || i === 5) {
              data = parseInt(u.reverseHex(data),16)
          } else if (i === 0) {
              data = data;
          } else {
              data = u.hexstring2str(data);
          }
        }
        if(key==="deployedEvents"){
          if (i > 3) {
              data = parseInt(u.reverseHex(data),16)
          } else if (i === 0) {
              data = data;
          } else {
              data = u.hexstring2str(data);
          }
        }

        rawArray.push(data);
        offset = itemLength + offset;

      }
      rawArray_outer.push(rawArray)
    }

      return rawArray_outer;
    };


    concatBytes = (source, start, length) => {
      let temp = "";
      for (let i = start; i < length; i += 1) temp += source[i];
      return temp;
    };


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
          helpState: false,

          scriptHash: "c186bcb4dc6db8e08be09191c6173456144c4b8d",
          dappHash: "9c6e3f2ebebfa9be84a4dfbfa40ac1aaefcf616f",
          userAddress: "",

          // for applyWhitelist
          wlAddress: false,
          wlStatus: false,

          //for WhitelistOrganizers
          whitelisted: [],
          currentIndex: 0,
          wlArrayLen: 0,
          currentAddress: "",
          currentOrgName: "",
          currentPerson: "",
          currentEmail: "",
          currentPhone: "",
          currentStatus: 0,
          currentDate: 0,

          //for deployedEvents
          mydeployedEvents: [],
          currentCat: "",
          currentName: "",
          currentAddr: "",
          currentPrice: 0,
          currentAvail: 0,
          currentATotal: 0,
          currentSold: 0,
          currentStart: 0,
          currentEnd: 0,
          currentEventTime: 0,
          currentIncome: 0,
          currentMEIndex: 0,
          currentMELen: 0,


    }

    componentDidMount() {
      this.props.nos.getAddress().then(address => {
        this.setState({userAddress: u.reverseHex(wallet.getScriptHashFromAddress(address))})
        //console.log(this.state.userAddress)
        //console.log(this.state.scriptHash+hexlify('/st/')+hexlify('applyWhitelist'))

        //console.log(u.int2hex(1530357900))
        //console.log(u.reverseHex(wallet.getScriptHashFromAddress(address)))
      });
    }

    checkWLOrg = (e) => {
      console.log(e)
      this.setState({currentIndex: e})
      this.setState({currentAddress:
        wallet.getAddressFromScriptHash(
          u.reverseHex(this.state.whitelisted[e][0]))});
      this.setState({currentOrgName:
          this.state.whitelisted[e][1]});
      this.setState({currentPerson:
          this.state.whitelisted[e][2]});
      this.setState({currentEmail:
          this.state.whitelisted[e][3]});
      this.setState({currentPhone:
          this.state.whitelisted[e][4]});
      this.setState({currentDate:
          this.getDateTime(this.state.whitelisted[e][5])});
      if(this.state.whitelisted[e][6]===1){
        this.setState({currentStatus:
            "Approved"});
      } else {
        this.setState({currentStatus:
            "Waiting"});
      }
    }

    checkMEOrg = (e) => {
      console.log(e)
      this.setState({currentMEIndex: e});
      this.setState({currentCat:
          this.state.mydeployedEvents[e][1]});
      this.setState({currentName:
          this.state.mydeployedEvents[e][2]});
      this.setState({currentAddr:
          this.state.mydeployedEvents[e][3]});
      this.setState({currentPrice:
          this.state.mydeployedEvents[e][4]/100000000});
      this.setState({currentTotal:
          this.state.mydeployedEvents[e][5]});
      this.setState({currentAvail:
          this.state.mydeployedEvents[e][6]});
      if(this.state.mydeployedEvents[e][7]>0){
        this.setState({currentSold:
          this.state.mydeployedEvents[e][7]});
      } else {
        this.setState({currentSold: 0});
      }
      this.setState({currentStart:
          this.getDateTime(this.state.mydeployedEvents[e][8])});
      this.setState({currentEnd:
          this.getDateTime(this.state.mydeployedEvents[e][9])});
      this.setState({currentEventTime:
          this.getDateTime(this.state.mydeployedEvents[e][10])});
      if(this.state.mydeployedEvents[e][11]>0) {
        this.setState({currentIncome:
          this.state.mydeployedEvents[e][11]});
      } else {
        this.setState({currentIncome: 0});
      }


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
          this.setState({wlAddress: false});
          this.setState({wlStatus: false});
          this.setState({whitelisted: []});
          this.setState({currentIndex: 0});
          this.setState({wlArrayLen: 0});
          this.setState({currentAddress: ""});
          this.setState({currentOrgName: ""});
          this.setState({currentPerson: ""});
          this.setState({currentEmail: ""});
          this.setState({currentPhone: ""});
          this.setState({currentStatus: 0});
          this.setState({currentDate: 0});
          this.setState({mydeployedEvents: []});
          this.setState({currentCat: ""});
          this.setState({currentName: ""});
          this.setState({currentAddr: ""});
          this.setState({currentPrice: 0});
          this.setState({currentAvail: 0});
          this.setState({currentATotal: 0});
          this.setState({currentSold: 0});
          this.setState({currentStart: 0});
          this.setState({currentEnd: 0});
          this.setState({currentEventTime: 0});
          this.setState({currentIncome: 0});
          this.setState({currentMEIndex: 0});
          this.setState({currentMELen: 0});
    }

    changeStates = (e) => {
          this.defaultStates();
          if(e === "buy"){
              this.setState({buyState: true});
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
            var getData;
            getData=this.handleGetStorage(this.state.scriptHash,
              this.state.dappHash+hexlify('/st/applyWhitelist'),
              false, false);
              Promise.resolve(getData).then(r => {
                //console.log(r)
                let deserialized = []
                deserialized = this.deserialize(r, "applyWhitelist");
                var i;
                for(i = 0; i < deserialized.length; i++){
                  if(deserialized[i][0]==this.state.userAddress){
                    this.setState({wlAddress: true})
                    console.log(deserialized[i])
                    if(deserialized[i][6]===1) {
                      this.setState({wlStatus: true})
                      console.log("Already approved!")
                    } else {
                      console.log("Not approved yet!")
                    }
                    console.log(this.state.wlAddress);
                    console.log(this.state.wlStatus);
                    break;
                  }
                }

              });
              this.setState({applyWLState: true});

          }
          if(e === "events"){
            var getData;
            var getDeployed;
            getData=this.handleGetStorage(this.state.scriptHash,
              this.state.dappHash+hexlify('/st/applyWhitelist'),
              false, false);
            getDeployed=this.handleGetStorage(this.state.scriptHash,
              this.state.dappHash+hexlify('/st/deployedEvents'),
              false, false);

            var check=false
            Promise.resolve(getData).then(r => {
                //console.log(r)
                let deserialized = []
                deserialized = this.deserialize(r, "applyWhitelist");
                var i;
                for(i = 0; i < deserialized.length; i++){
                  if(deserialized[i][0]==this.state.userAddress
                  && deserialized[i][6]===1) {
                    check=true
                    break;
                  }
                }
                if(!check){
                  alert("Your address not yet whitelisted or waiting for approval")
                } else {
                  Promise.resolve(getDeployed).then(r => {
                    if(r===null) {
                      console.log("r null")
                      this.setState({currentMELen:
                        0});                      
                      this.setState({eventsState: true});
                    } else {
                    let deserialized_de = []
                    deserialized_de = this.deserialize(r, "deployedEvents");
                    var j;
                    let p = this.state.mydeployedEvents.slice();
                    for(j=0; j < deserialized_de.length; j++){
                      if(deserialized_de[j][0]==this.state.userAddress){
                        p.push(deserialized_de[j])
                        this.setState({mydeployedEvents: p})
                      }
                    }
                    this.setState({currentMELen:
                      this.state.mydeployedEvents.length});
                    this.checkMEOrg(this.state.currentMEIndex);
                    this.setState({eventsState: true});
                    }
                  })
                }
              });

            //this.setState({eventsState: true});
          }
          if(e === "orgWL"){
            var getData;
            getData=this.handleGetStorage(this.state.scriptHash,
              this.state.dappHash+hexlify('/st/applyWhitelist'),
              false, false);
            Promise.resolve(getData).then(r => {
                this.setState({whitelisted: this.deserialize(r, "applyWhitelist")});
                this.setState({wlArrayLen: this.state.whitelisted.length});
                this.checkWLOrg(this.state.currentIndex);
              });
            this.setState({orgWLState: true});
          }
          if(e === "advertiser"){
              this.setState({advertiserState: true});
          }
          if(e === "help"){
              this.setState({helpState: true});
          }
          if(e === "default") {
            this.defaultStates();
          }

    }

    callMain = ({classes, nos}) => {
      var getData="";
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

    callBuy = ({classes, nos}) => {
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

    callMy = ({classes, nos}) => {
      return(
        <div className={classes.middleCol}>
          <MainTitle>My Tickets</MainTitle>
            <div className={classes.middleCol_Center}>
              <h1>Test my Tickets</h1>
            </div>
        </div>

      );
    }

    callRefund = ({classes, nos}) => {
      return(
        <div className={classes.middleCol}>
          <MainTitle>Refund Tickets</MainTitle>
            <div className={classes.middleCol_Center}>
              <h1>test Refund Tickets</h1>
            </div>
        </div>

      );
    }

    callCheckin = ({classes, nos}) => {
      return(
        <div className={classes.middleCol}>
          <MainTitle>Check-In Tickets</MainTitle>
            <div className={classes.middleCol_Center}>
              <h1>test checkin Tickets</h1>
            </div>
        </div>

      );
    }

    callApplyWL = ({classes, nos}) => {
      return(
        <div className={classes.middleCol}>
          <MainTitle>Apply Whitelisting</MainTitle>
            <div className={classes.middleCol_Center}>
              <ApplyWhitelisting clickHandler = {this.changeStates}
                scriptHash={this.state.scriptHash}
                dappHash={this.state.dappHash}
                handleInvoke={this.handleInvoke}
                wlAddress={this.state.wlAddress}
                wlStatus={this.state.wlStatus}
                userAddress={this.state.userAddress}
                classes={classes}/>
            </div>
        </div>

      );
    }

    callEvents = ({classes, nos}) => {
      return(
        <div className={classes.middleCol}>
          <MainTitle>Manage Events</MainTitle>
            <div className={classes.middleCol_Center}>
            <ManageEvents clickHandler = {this.changeStates}
              scriptHash={this.state.scriptHash}
              dappHash={this.state.dappHash}
              handleInvoke={this.handleInvoke}
              userAddress={this.state.userAddress}
              currentMEIndex={this.state.currentMEIndex}
              currentCat={this.state.currentCat}
              currentName={this.state.currentName}
              currentAddr={this.state.currentAddr}
              currentPrice={this.state.currentPrice}
              currentAvail={this.state.currentAvail}
              currentTotal={this.state.currentTotal}
              currentSold={this.state.currentSold}
              currentStart={this.state.currentStart}
              currentEnd={this.state.currentEnd}
              currentEventTime={this.state.currentEventTime}
              currentIncome={this.state.currentIncome}
              currentMELen={this.state.currentMELen}
              checkMEOrg={this.checkMEOrg}
              classes={classes}/>
            </div>
        </div>

      );
    }

    callOrgWL = ({classes, nos}) => {
      return(
        <div className={classes.middleCol}>
          <MainTitle>Whitelist Organizers</MainTitle>
            <div className={classes.middleCol_Center}>
            <WhitelistOrganizers clickHandler = {this.changeStates}
              scriptHash={this.state.scriptHash}
              dappHash={this.state.dappHash}
              handleInvoke={this.handleInvoke}
              userAddress={this.state.userAddress}
              currentDate={this.state.currentDate}
              currentEmail={this.state.currentEmail}
              currentIndex={this.state.currentIndex}
              currentPhone={this.state.currentPhone}
              currentPerson={this.state.currentPerson}
              currentAddress={this.state.currentAddress}
              currentOrgName={this.state.currentOrgName}
              currentStatus={this.state.currentStatus}
              wlArrayLen={this.state.wlArrayLen}
              checkWLOrg={this.checkWLOrg}
              classes={classes}/>
            </div>
        </div>

      );
    }

    callAdvertiser = ({classes, nos}) => {
      return(
        <div className={classes.middleCol}>
          <MainTitle>Advertisements</MainTitle>
            <div className={classes.middleCol_Center}>
              <h1>test Advertisement</h1>
            </div>
        </div>

      );
    }

    callHelp = ({classes, nos}) => {
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

        const { classes, nos } = this.props;
        const { deserialize } = this;

        if(this.state.buyState) {
              return this.callBuy({classes, nos});
        } else if(this.state.myState) {
              return this.callMy({classes, nos});
        } else if(this.state.refundState) {
              return this.callRefund({classes, nos});
        } else if(this.state.checkinState) {
              return this.callCheckin({classes, nos});
        } else if(this.state.applyWLState) {
              return this.callApplyWL({classes, nos});
        } else if(this.state.eventsState) {
              return this.callEvents({classes, nos});
        } else if(this.state.orgWLState) {
              return this.callOrgWL({classes, nos});
        } else if(this.state.advertiserState) {
              return this.callAdvertiser({classes, nos});
        } else if(this.state.helpState) {
              return this.callHelp({classes, nos});
        } else {
            return this.callMain({classes, nos});
        }

      }

}

MainScreen.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  nos: nosProps.isRequired
};

export default injectNOS(injectSheet(styles)(MainScreen));
