import React, {Component} from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import { react } from "@nosplatform/api-functions";
import { u, wallet } from "@cityofzion/neon-js";
import { unhexlify }  from "binascii";

import MainTitle from "./MainTitle";
import Button from "./Button";
import BuyTickets from "./../buyTickets/BuyTickets";
import ApplyWhitelisting from "./../applyWhitelisting/ApplyWhitelisting";


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

      /**
       * Deserializes a serialized array that's passed as a hexstring
       * @param {hexstring} rawData
       */
      deserialize = rawData => {
        // Split into bytes of 2 characters
      const rawSplitted = rawData.match(/.{2}/g);
        console.log(rawSplitted);
        // see https://github.com/neo-project/neo/blob/master/neo/SmartContract/StackItemType.cs for data types
        /*
            ByteArray = 0x00,
            Boolean = 0x01,
            Integer = 0x02,
            InteropInterface = 0x40,
            Array = 0x80,
            Struct = 0x81,
            Map = 0x82,
        */
        // skip 80 (array) => we do only array

        // the array length
      const arrayLen = parseInt(rawSplitted[1], 16);
        console.log("arrayLen" + arrayLen);
      let offset = 2;
      const rawArray = [];

      for (let i = 0; i < arrayLen; i += 1) {
          // get item type
        const itemType = parseInt(rawSplitted[offset], 16);
          console.log("itemtype" + itemType)
        offset += 1;

          // get item length
        let itemLength = parseInt(rawSplitted[offset], 16);
          // serialize: https://github.com/neo-project/neo-vm/blob/master/src/neo-vm/Helper.cs#L41-L64
        offset += 1;
        if (itemLength === 253) {
            // new itemlentgh = reverse int of next 2
          itemLength = parseInt(u.reverseHex(this.concatBytes(rawSplitted, offset, offset + 2)), 16);
          offset += 2;

            /* d
              writer.Write((byte)0xFD);
              writer.Write((ushort)value);
            */
            /* s
            value = reader.ReadUInt16();
           */
        } else if (itemLength === 254) {
            // new itemlentgh = reverse int of next 4
          itemLength = parseInt(u.reverseHex(this.concatBytes(rawSplitted, offset, offset + 2)), 16);
          offset += 4;
            /* d
              writer.Write((byte)0xFE);
              writer.Write((uint)value);
            */
            /* s
           value = reader.ReadUInt32();
           */
        } else if (itemLength === 255) {
            // new itemlentgh = reverse int of next 8
          itemLength = parseInt(u.reverseHex(this.concatBytes(rawSplitted, offset, offset + 2)), 16);
          offset += 8;
            /* d
              writer.Write((byte)0xFF);
              writer.Write(value); */
            /* s
              value = reader.ReadUInt64();
              */
        } else {
            /* d
               writer.Write((byte)value);
              */
            /* s
              value = fb;
             */
        }
           console.log("itemLength" + itemLength)
           console.log(offset);
        let data = this.concatBytes(rawSplitted, offset, itemLength + offset);
           console.log(data);
        //if (itemType === 2) {
        //   console.log("data: " + parseInt(u.reverseHex(data),16));
        //  data = u.reverseHex(data);
        //     console.log ("TIME" + data);
        //} else if (itemType === 0) {
            // [unhexlify(u.reverseHex(wallet.getScriptHashFromAddress(this.state.userAddress))),
            // data = hexlify(u.reverseHex(wallet.getAddressFromScriptHash))
        //  if (i === 0) {
              // console.log(u.hexstring2str(data));
          data = u.hexstring2str(data);
        //  } else {
        //    data = wallet.getAddressFromScriptHash(u.reverseHex(data));
        //    console.log(wallet.getAddressFromScriptHash(u.reverseHex(data)));
        //  }
        //}
        rawArray.push(data);
          console.log("pushed to array")
        offset = itemLength + offset;
           console.log("new offset" + offset);
      }
        // 0:message
        // 1:time
        // 2:addr
      return rawArray;
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
          dappAddress: "",
          userAddress: "",

    }

    componentDidMount() {
      this.props.nos.getAddress().then(address => {
        this.setState({userAddress: address})
        console.log(address)
      });
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

    callMain = ({classes, nos}) => {
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
                check={this.state.applyWL} userAddr={this.state.userAddress} />
            </div>
        </div>

      );
    }

    callEvents = ({classes, nos}) => {
      return(
        <div className={classes.middleCol}>
          <MainTitle>Manage Events</MainTitle>
            <div className={classes.middleCol_Center}>
              <h1>test Manage events</h1>
            </div>
        </div>

      );
    }

    callOrgWL = ({classes, nos}) => {
      return(
        <div className={classes.middleCol}>
          <MainTitle>Whitelist Organizers</MainTitle>
            <div className={classes.middleCol_Center}>
              <h1>test Whitelist Organizers</h1>
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
