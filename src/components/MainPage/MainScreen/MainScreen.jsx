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
import MyTickets from "./../myTickets/MyTickets";


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
    paddingTop: "2px"

  },
  homeButton: {
    width: "10%",
    fontSize: "15px",
    border: ["1px", "solid", "#ccc"],
    borderRadius: "4px",
    background: "#ccc",
    '&:hover': {
      cursor: "pointer",
      background: "#a2a2a2"
    }

  },
  heading_deploy: {
    padding: "10px",
    margin: "20px",
    marginTop: "50px",
    marginBottom: "0px",
    fontSize: "20px",
    display: "flex",
    color: "#2c8e75",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    border: ["1px", "solid", "#ccc"],
    borderRadius: ["5px","5px", "5px", "5px"],
    backgroundColor: "#f2f2f2",


  },
  heading: {
    padding: "20px",
    margin: "20px",
    marginTop: "50px",
    marginBottom: "0px",
    border: ["1px", "solid", "#ccc"],
    borderRadius: ["5px","5px", "0px", "0px"],
    display: "flex",
    fontSize: "25px",
    color: "#2c8e75",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc"

  },

  container: {
    borderRadius: ["0px","0px", "5px", "5px"],
    backgroundColor: "#f2f2f2",
    padding: "20px",
    margin: "20px",
    marginTop: "0px"

  },

  col100: {
    width: "100%",
    float: "left",
    wordWrap: "break-word",
    border:["2px", "solid", "#aaa"],
    borderRadius: "5px",    
    marginBottom: "20px",
    marginTop: "20px"
  },

  col45: {
    width: "45%",
    margin:"10px",
    float: "left",
    wordWrap: "break-word",
    border:["2px", "solid", "#aaa"],
    background:"linear-gradient(to top, #5CA571, #ddd)",
    borderRadius: "5px",
    marginBottom: "20px",
    marginTop: "20px"
  },

  col30: {
    width: "28%",
    margin:"10px",
    float: "left",
    wordWrap: "break-word",
    border:["2px", "solid", "#aaa"],
    background:"linear-gradient(to top, #5CA571, #ddd)",
    borderRadius: "5px",
    marginBottom: "20px",
    marginTop: "20px"
  },

  col20: {
    float: "left",
    width: "20%",
    marginTop: "20px"
  },
  col40: {
    float: "left",
    width: "45%",
    marginTop: "20px"
  },
  col15: {
    float: "left",
    width: "15%",
    marginTop: "10px"
  },

  col25: {
    float: "left",
    width: "30%",
    marginTop: "20px"
  },

  col75: {
    float: "left",
    width: "65%",
    marginTop: "20px",
  },
  row:{
    content: "",
    clear: "both"
  },
  label: {
    padding: ["12px", "12px", "12px", "0px"],
    display: "inline-block",
    fontSize: "15px"
  },
  label2: {
    width: "100%",
    padding: ["12px", "12px", "12px", "12px"],
    display: "inline-block",
    border: ["1px", "solid", "#ccc"],
    borderRadius: "4px",
    resize: "vertical"
  },
  input: {
    width: "100%",
    padding: "12px",
    border: ["1px", "solid", "#ccc"],
    borderRadius: "4px",
    resize: "vertical"
  },
  submit_btn: {
    width: "100%",
    marginTop: "20px",
    fontSize: "20px",
    padding: "6px",
    border: ["1px", "solid", "#ccc"],
    borderRadius: "6px",
    background: "#3CB371",
    '&:hover': {
      cursor: "pointer",
      background: "#2c8e75"
    }
  },
  changeButton: {
    width: "28%",
    fontSize: "12px",
    marginLeft: "15px",
    paddingTop: "7px",
    paddingBottom: "7px",
    border: ["1px", "solid", "#ccc"],
    borderRadius: "4px",
    background: "#3CB371",
    '&:hover': {
      cursor: "pointer",
      background: "#2c8e75"
    }
  },

  eventDetails: {
    width: "100%",
    float: "left",
    paddingTop: "10px",
    paddingBottom: "10px",
    textAlign: "center",
    fontSize: "17px",
    borderBottom: ["1px", "solid", "#fff"],
    backgroundColor: "#aaa"

  },

  eventCat: {
    width: "100%",
    paddingTop: "10px",
    paddingBottom: "10px",
    float: "left",
    textAlign: "center",
    fontSize: "15px"
  },
  eventName: {
    width: "100%",
    float: "left",
    textAlign: "center",
    fontSize: "15px",
    borderTop: ["1px", "solid", "#fff"],
    borderBottom: ["1px", "solid", "#fff"],
    paddingTop: "15px",
    paddingBottom: "15px"
  },
  eventAddress: {
    width: "100%",
    float: "left",
    textAlign: "center",
    fontSize: "15px",
    borderBottom: ["1px", "solid", "#fff"],
    paddingTop: "15px",
    paddingBottom: "15px"
  },
  eventBuy: {
    width: "100%",
    float: "left",
    textAlign: "center",
    fontSize: "15px",
    paddingTop: "5px",
    paddingBottom: "5px"
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


      getDateTime = unixTimestamp => {
          const date = new Date(unixTimestamp * 1000);
          const hours = date.getHours();
          const minutes = `0${date.getMinutes()}`;
          const seconds = `0${date.getSeconds()}`;
          return `${date.toLocaleDateString()} ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
      };

      // deserialized for tickets
      deserialize_tickets = (rawData) => {

      const rawSplitted = rawData.match(/.{2}/g);


      const arrayLen = parseInt(rawSplitted[offset+1], 16);

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

        if (i === 4 || i === 5) {
            data = parseInt(u.reverseHex(data),16)
        } else if (i === 0) {
            data = data;
        } else {
            data = u.hexstring2str(data);
        }

        rawArray.push(data);
        offset = itemLength + offset;

      }

      return rawArray;
    };

      // deserialized for applyWhitelist and deployedEvents
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
          dappOwner:"dd4589c148cead3934bb57b4957e95fbf117fa4e",
          userAddress: "",
          todayDate: 0,

          // for applyWhitelist
          wlAddress: false,
          wlStatus: "",

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

          //for BuyTickets
          deserialized:[],
          deserialized_upcoming: [],

          //unclocked tickets information
          myTickets: [],


    }

    componentDidMount() {
      this.props.nos.getAddress().then(address => {
        this.setState({userAddress: u.reverseHex(wallet.getScriptHashFromAddress(address))})
        this.setState({todayDate: new Date(Date()).getTime()/1000})
        //console.log(this.state.todayDate);
        //console.log(this.state.userAddress)
        //console.log(this.state.scriptHash+hexlify('/st/')+hexlify('applyWhitelist'))

        //console.log(u.int2hex(1530357900))
        //console.log(u.reverseHex(wallet.getScriptHashFromAddress(this.state.dappOwner)))
        //console.log(this.state.userAddress)
      });

    }

    checkWLOrg = (e) => {

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
            "Waiting for approval"});
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
          this.setState({wlStatus: ""});
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
          this.setState({deserialized_upcoming: []});
          this.setState({deserialized: []});

    }

    changeStates = (e) => {
          this.defaultStates();
          if(e === "buy"){
            var getDeployed;
            getDeployed=this.handleGetStorage(this.state.scriptHash,
              this.state.dappHash+hexlify('/st/deployedEvents'),
              false, false);
            Promise.resolve(getDeployed).then(r => {
              if(r===null) {
                alert("No event found!")
              } else {
              let deserialized_de = []
              deserialized_de = this.deserialize(r, "deployedEvents");
              var j;
              let p = this.state.deserialized.slice();
              let c = this.state.deserialized_upcoming.slice();
              for(j=0; j < deserialized_de.length; j++){
                //console.log(deserialized_de[j])
                if(this.state.todayDate > deserialized_de[j][8] &&
                this.state.todayDate < deserialized_de[j][9]) {
                  deserialized_de[j][8]=this.getDateTime(deserialized_de[j][8])
                  deserialized_de[j][9]=this.getDateTime(deserialized_de[j][9])
                  deserialized_de[j][10]=this.getDateTime(deserialized_de[j][10])

                  p.push(deserialized_de[j])
                  this.setState({deserialized: p})
                }
                if(this.state.todayDate < deserialized_de[j][8]) {
                  deserialized_de[j][8]=this.getDateTime(deserialized_de[j][8])
                  deserialized_de[j][9]=this.getDateTime(deserialized_de[j][9])
                  deserialized_de[j][10]=this.getDateTime(deserialized_de[j][10])

                  c.push(deserialized_de[j])
                  this.setState({deserialized_upcoming: c})
                }
              }
              //console.log(this.state.deserialized);
              if(this.state.deserialized!==null){
                this.setState({buyState: true});
              } else {
                alert("No active event found!")
              }
              }
            })


          }

          if(e === "my"){
            var getDeployed;
            getDeployed=this.handleGetStorage(this.state.scriptHash,
              this.state.dappHash+hexlify('/st/deployedEvents'),
              false, false);
            Promise.resolve(getDeployed).then(r => {
              if(r===null) {
                alert("No event found!")
              } else {
              let deserialized_de = []
              deserialized_de = this.deserialize(r, "deployedEvents");
              var j;
              let p = this.state.deserialized.slice();
              for(j=0; j < deserialized_de.length; j++){
                //console.log(deserialized_de[j])
                if(this.state.todayDate > deserialized_de[j][8]) {
                  deserialized_de[j][8]=this.getDateTime(deserialized_de[j][8])
                  deserialized_de[j][9]=this.getDateTime(deserialized_de[j][9])
                  deserialized_de[j][10]=this.getDateTime(deserialized_de[j][10])

                  p.push(deserialized_de[j])
                  this.setState({deserialized: p})
                }

              }
              //console.log(this.state.deserialized);
              if(this.state.deserialized!==null){
                this.setState({myState: true});
              } else {
                alert("No active event found!")
              }
              }
            })
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
                      this.setState({wlStatus: "Approved"})
                      console.log("Already approved!")
                    } else {
                      this.setState({wlStatus: "Waiting for Approval"})
                      console.log("Not approved yet!")
                    }
                    console.log(this.state.wlAddress);
                    console.log(this.state.wlStatus);
                    break;
                  }
                }
                this.setState({applyWLState: true});
              });


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
            if(this.state.userAddress===this.state.dappOwner){
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
            } else {
               alert("You are not authorized to perform this operation!")
             }
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
                    src={require('./../../../img/myTickets.png')} />
                </Button>

                <Button clickHandler = {this.changeStates}
                  check={this.state.refund}
                  title="Refund Tickets">
                  <img className={classes.img}
                    src={require('./../../../img/refund.png')} />
                </Button>

                <Button clickHandler = {this.changeStates}
                  check={this.state.checkin}
                  title="Check-in Tickets">
                  <img className={classes.img}
                    src={require('./../../../img/checkin.png')} />
                </Button>

                <Button clickHandler = {this.changeStates}
                  check={this.state.applyWL}
                  title="Apply Whitelisting">
                  <img className={classes.img}
                    src={require('./../../../img/apply.png')} />
                </Button>

                <Button clickHandler = {this.changeStates}
                  check={this.state.events}
                  title="Manage Events">
                  <img className={classes.img}
                    src={require('./../../../img/organiser.png')} />
                </Button>

                <Button clickHandler = {this.changeStates}
                  check={this.state.orgWL}
                  title="Whitelist Organizers">
                  <img className={classes.img}
                    src={require('./../../../img/whitelist.png')} />
                </Button>

                <Button clickHandler = {this.changeStates}
                  check={this.state.advertiser}
                  title="Advertisement">
                  <img className={classes.img}
                    src={require('./../../../img/advertise.png')} />
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
                scriptHash={this.state.scriptHash}
                dappHash={this.state.dappHash}
                handleInvoke={this.handleInvoke}
                deserialized={this.state.deserialized}
                deserialized_upcoming={this.state.deserialized_upcoming}
                classes={classes}
                getDateTime={this.getDateTime}
                userAddress={this.state.userAddress}
                deserializeTickets={this.deserialize_tickets}
                handleGetStorage={this.handleGetStorage}
                 />
            </div>
        </div>

      );
    }

    callMy = ({classes, nos}) => {
      return(
        <div className={classes.middleCol}>
          <MainTitle>My Tickets</MainTitle>
            <div className={classes.middleCol_Center}>
            <MyTickets clickHandler = {this.changeStates}
              scriptHash={this.state.scriptHash}
              dappHash={this.state.dappHash}
              handleInvoke={this.handleInvoke}
              deserialized={this.state.deserialized}
              classes={classes}
              getDateTime={this.getDateTime}
              userAddress={this.state.userAddress}
              deserializeTickets={this.deserialize_tickets}
              handleGetStorage={this.handleGetStorage}
               />
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
        const { deserialize, deserialize_tickets } = this;

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
