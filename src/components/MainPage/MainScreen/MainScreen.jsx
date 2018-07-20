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
import RefundTickets from "./../refundTickets/RefundTickets";
import CheckinTickets from "./../checkinTickets/CheckinTickets";
import Advertisements from "./../advertisements/Advertisements";


const { injectNOS, nosProps } = react.default;



const styles = {
  mainscreen:{}

};

class MainScreen extends Component {
      handleAlert = async func => alert(await func);

      handleGetStorage = async (scriptHash, key, encodeInput, decodeOutput)
          => this.props.nos
               .getStorage({ scriptHash, key, encodeInput, decodeOutput})
               .catch(err => alert(`Error: ${err.message}`));

      handleInvoke = async (scriptHash, operation, args, encodeArgs)
          => this.props.nos
               .invoke({ scriptHash, operation, args, encodeArgs })
               .then(txid => alert(`Invoke txid: ${txid} `))
               .catch(err => alert(`Error: ${err.message}`));

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
      //console.log(rawSplitted);


      const arrayLen = parseInt(rawSplitted[1], 16);

      let offset = 2;

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

        if (i === 6 || i === 7 || i === 8 || i === 9) {
            data = parseInt(u.reverseHex(data),16)
        } else if (i === 1 || i === 2) {
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
          if (i === 5) {
              data = this.getDateTime(parseInt(u.reverseHex(data),16))
          } else if (i === 6) {
              data = parseInt(u.reverseHex(data),16)
              if (data===1){
                data = "Approved"
              } else {
                data = "Waiting for approval"
              }
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
          dappHash: "178fef7cf45e06275495c45e2230794b32e6aa46",
          dappOwner:"d3b92223997759b2c822e8fa13ef9d2daa012f33",
          userAddress: "",
          todayDate: 0,

          // for applyWhitelist
          wlAddress: false,
          wlStatus: "",

          //for WhitelistOrganizers
          whitelisted: [],

          //for deployedEvents
          mydeployedEvents: [],

          //for BuyTickets
          deserialized:[],
          deserialized_upcoming: [],
          deserialized_past: [],

          //unclocked tickets information
          myTickets: [],
          purchasedTickets: [],


    }

    componentDidMount() {
      if(this.props.nos.exists){
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

    }

    removeTicket = (e) => {
      var array = this.state.myTickets
      let i;
      //console.log(array)
      for(i=0; i<array.length; i++){
        if(array[i][10] === e){
          this.setState({myTickets: []})
          array.splice(i, 1);
        }
      }
      this.setState({myTickets: array})
    }

    addTickets = (e) => {

      let i;
      var array = this.state.myTickets
      for(i=0; i<array.length; i++){
        if(e[10]===array[i][10]){
          this.setState({myTickets: []})
          array.splice(i, 1);
        }
      }
      this.setState({myTickets: array})
      let p = this.state.myTickets.slice();
      p.push(e);
      this.setState({myTickets: p})


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
          this.setState({mydeployedEvents: []});
          this.setState({deserialized_upcoming: []});
          this.setState({deserialized_past: []});
          this.setState({deserialized: []});
          this.setState({purchasedTickets: []});
          this.setState({todayDate: new Date(Date()).getTime()/1000})

    }

    changeStates = (e) => {
          this.defaultStates();
          if(e === "buy"){
            var getDeployed;
            this.setState({todayDate: new Date(Date()).getTime()/1000})
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
              let d = this.state.deserialized_past.slice();
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
                if(this.state.todayDate > deserialized_de[j][9]) {
                  deserialized_de[j][8]=this.getDateTime(deserialized_de[j][8])
                  deserialized_de[j][9]=this.getDateTime(deserialized_de[j][9])
                  deserialized_de[j][10]=this.getDateTime(deserialized_de[j][10])

                  d.push(deserialized_de[j])
                  this.setState({deserialized_past: d})
                }
              }
              //console.log(this.state.deserialized);
              if(this.state.deserialized!==null ||
                this.state.deserialized_upcoming!==null ||
                this.state.deserialized_past!==null){
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
            if(this.state.myTickets.length!==0){
              let i;
              let check=false
              let p = this.state.purchasedTickets.slice();
              for (i=0; i<this.state.myTickets.length; i++){
                if(this.state.myTickets[i][0]==="purchased"
                  && this.state.myTickets[i][8] > this.state.todayDate)
                  {
                  check=true
                  p.push(this.state.myTickets[i])
                  this.setState({purchasedTickets: p})

                }
              }
              if(check){
                this.setState({refundState: true});
              } else {
                alert("No ticket(s) found with purchased status!")
              }
            } else {
              alert("Please unlock tickets first by using \"My Tickets\" and try again.")
            }
          }
          if(e === "checkin"){
            if(this.state.myTickets.length!==0){
              let i;
              let check=false
              let p = this.state.purchasedTickets.slice();
              for (i=0; i<this.state.myTickets.length; i++){
                if(this.state.myTickets[i][0]==="purchased"){
                  check=true
                  p.push(this.state.myTickets[i])
                  this.setState({purchasedTickets: p})
                }
              }
              if(check){
                this.setState({checkinState: true});
              } else {
                alert("No ticket(s) found with purchased status!")
              }

            } else {
              alert("Please unlock tickets first by using \"My Tickets\" and try again.")
            }
          }
          if(e === "applyWL"){
            var getData;
            getData=this.handleGetStorage(this.state.scriptHash,
              this.state.dappHash+hexlify('/st/applyWhitelist'),
              false, false);

            Promise.resolve(getData).then(r => {
              if(r!==null) {
                let deserialized = []
                deserialized = this.deserialize(r, "applyWhitelist");
                var i;
                for(i = 0; i < deserialized.length; i++){
                  if(deserialized[i][0]===this.state.userAddress){
                    this.setState({wlAddress: true})
                    //console.log(deserialized[i])
                    if(deserialized[i][6]==="Approved") {
                      this.setState({wlStatus: "Approved"})
                      //console.log("Already approved!")
                    } else {
                      this.setState({wlStatus: "Waiting for Approval"})
                      //console.log("Not approved yet!")
                    }

                    break;
                  }
                }
                this.setState({applyWLState: true});
              } else {
                this.setState({applyWLState: true});
              }
            }
          );


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
                  if(deserialized[i][0]===this.state.userAddress
                  && deserialized[i][6]==="Approved") {
                    check=true
                    break;
                  }
                }
                if(!check){
                  alert("Your address not yet whitelisted or waiting for approval")
                } else {
                  Promise.resolve(getDeployed).then(r => {
                    if(r===null) {
                      this.setState({eventsState: true});
                    } else {
                    let deserialized_de = []
                    deserialized_de = this.deserialize(r, "deployedEvents");
                    var j;
                    let p = this.state.mydeployedEvents.slice();
                    for(j=0; j < deserialized_de.length; j++){
                      if(deserialized_de[j][0]===this.state.userAddress){
                        p.push(deserialized_de[j])
                        this.setState({mydeployedEvents: p})
                      }
                    }
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
              this.setState({whitelisted: this.deserialize(r, "applyWhitelist")},
              () => this.setState({orgWLState: true})
              );

              });

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
            <MainTitle classes={classes}>SmartT Main Page</MainTitle>
            <div className={classes.middleCol_Center}>
              <div className={classes.buttonsContainer}>
                <Button clickHandler = {this.changeStates}
                  title="Buy Tickets"
                  check={this.state.buy}
                  classes={classes}>
                  <img className={classes.img}
                    src={require('./../../../img/user.png')} />
                </Button>

                <Button clickHandler = {this.changeStates}
                  check={this.state.my}
                  title="My Tickets"
                  classes={classes}>
                  <img className={classes.img}
                    src={require('./../../../img/myTickets.png')} />
                </Button>

                <Button clickHandler = {this.changeStates}
                  check={this.state.refund}
                  title="Refund Tickets"
                  classes={classes}>
                  <img className={classes.img}
                    src={require('./../../../img/refund.png')} />
                </Button>

                <Button clickHandler = {this.changeStates}
                  check={this.state.checkin}
                  title="Check-in Tickets"
                  classes={classes}>
                  <img className={classes.img}
                    src={require('./../../../img/checkin.png')} />
                </Button>

                <Button clickHandler = {this.changeStates}
                  check={this.state.applyWL}
                  title="Apply Whitelisting"
                  classes={classes}>
                  <img className={classes.img}
                    src={require('./../../../img/apply.png')} />
                </Button>

                <Button clickHandler = {this.changeStates}
                  check={this.state.events}
                  title="Manage Events"
                  classes={classes}>
                  <img className={classes.img}
                    src={require('./../../../img/organiser.png')} />
                </Button>

                <Button clickHandler = {this.changeStates}
                  check={this.state.orgWL}
                  title="Whitelist Organizers"
                  classes={classes}>
                  <img className={classes.img}
                    src={require('./../../../img/whitelist.png')} />
                </Button>

                <Button clickHandler = {this.changeStates}
                  check={this.state.advertiser}
                  title="Advertisement"
                  classes={classes}>
                  <img className={classes.img}
                    src={require('./../../../img/advertise.png')} />
                </Button>

                <Button clickHandler = {this.changeStates}
                  check={this.state.help}
                  title="Help"
                  classes={classes}>
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
          <MainTitle classes={classes}>Buy Tickets</MainTitle>
            <div className={classes.middleCol_Center}>
              <BuyTickets clickHandler = {this.changeStates}
                scriptHash={this.state.scriptHash}
                dappHash={this.state.dappHash}
                handleInvoke={this.handleInvoke}
                deserialized={this.state.deserialized}
                deserialized_upcoming={this.state.deserialized_upcoming}
                deserialized_past={this.state.deserialized_past}
                classes={classes}
                getDateTime={this.getDateTime}
                userAddress={this.state.userAddress}
                handleGetStorage={this.handleGetStorage}
                 />
            </div>
        </div>

      );
    }

    callMy = ({classes, nos}) => {
      return(
        <div className={classes.middleCol}>
          <MainTitle classes={classes}>My Tickets</MainTitle>
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
              addTickets={this.addTickets}
              handleGetStorage={this.handleGetStorage}
              myTickets={this.state.myTickets}
               />
            </div>
        </div>

      );
    }

    callRefund = ({classes, nos}) => {
      return(
        <div className={classes.middleCol}>
          <MainTitle classes={classes}>Refund Tickets</MainTitle>
            <div className={classes.middleCol_Center}>
              <RefundTickets clickHandler = {this.changeStates}
                scriptHash={this.state.scriptHash}
                dappHash={this.state.dappHash}
                handleInvoke={this.handleInvoke}
                classes={classes}
                getDateTime={this.getDateTime}
                userAddress={this.state.userAddress}
                addTickets={this.addTickets}
                handleGetStorage={this.handleGetStorage}
                myTickets={this.state.purchasedTickets}
                removeTicket={this.removeTicket}
                 />
            </div>
        </div>

      );
    }

    callCheckin = ({classes, nos}) => {
      return(
        <div className={classes.middleCol}>
          <MainTitle classes={classes}>Check-In Tickets</MainTitle>
            <div className={classes.middleCol_Center}>
              <CheckinTickets clickHandler = {this.changeStates}
                scriptHash={this.state.scriptHash}
                dappHash={this.state.dappHash}
                handleInvoke={this.handleInvoke}
                classes={classes}
                getDateTime={this.getDateTime}
                userAddress={this.state.userAddress}
                addTickets={this.addTickets}
                handleGetStorage={this.handleGetStorage}
                myTickets={this.state.purchasedTickets}
                removeTicket={this.removeTicket}
                 />
            </div>
        </div>

      );
    }

    callApplyWL = ({classes, nos}) => {
      return(
        <div className={classes.middleCol}>
          <MainTitle classes={classes}>Apply Whitelisting</MainTitle>
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
          <MainTitle classes={classes}>Manage Events</MainTitle>
            <div className={classes.middleCol_Center}>
            <ManageEvents clickHandler = {this.changeStates}
              scriptHash={this.state.scriptHash}
              dappHash={this.state.dappHash}
              handleInvoke={this.handleInvoke}
              userAddress={this.state.userAddress}
              mydeployedEvents = {this.state.mydeployedEvents}
              getDateTime={this.getDateTime}
              handleGetStorage={this.handleGetStorage}
              deserializeTickets={this.deserialize_tickets}

              classes={classes}/>
            </div>
        </div>

      );
    }

    callOrgWL = ({classes, nos}) => {
      return(
        <div className={classes.middleCol}>
          <MainTitle classes={classes}>Whitelist Organizers</MainTitle>
            <div className={classes.middleCol_Center}>
            <WhitelistOrganizers clickHandler = {this.changeStates}
              scriptHash={this.state.scriptHash}
              dappHash={this.state.dappHash}
              handleInvoke={this.handleInvoke}
              userAddress={this.state.userAddress}
              whitelisted={this.state.whitelisted}
              classes={classes}/>
            </div>
        </div>

      );
    }

    callAdvertiser = ({classes, nos}) => {
      return(
        <div className={classes.middleCol}>
          <MainTitle classes={classes}>Advertisements</MainTitle>
            <div className={classes.middleCol_Center}>
              <Advertisements classes={classes}
                clickHandler = {this.changeStates}
                scriptHash={this.state.scriptHash}
                dappHash={this.state.dappHash}
                handleInvoke={this.handleInvoke}
                userAddress={this.state.userAddress} />
            </div>
        </div>

      );
    }

    callHelp = ({classes, nos}) => {
      return(
        <div className={classes.middleCol}>
          <MainTitle classes={classes}>Help</MainTitle>
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
