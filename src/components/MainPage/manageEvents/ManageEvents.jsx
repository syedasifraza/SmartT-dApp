import React, {Component} from 'react';
import PropTypes from 'prop-types';
import injectSheet from "react-jss";
import { react } from "@nosplatform/api-functions";
import { u, wallet } from "@cityofzion/neon-js";
import { unhexlify, hexlify }  from "binascii";


const { injectNOS } = react.default;

const styles = {
  ManageEvents: {}
};


class ManageEvents extends Component {

  state = {
    changeState: "default"

  }


  handleChange = e => {
    if(e==="next"){
      console.log(this.props.currentMELen)
      if((this.props.currentMEIndex + 1) < this.props.currentMELen) {
        this.props.checkMEOrg(this.props.currentMEIndex + 1);
      } else {
        this.props.checkMEOrg(this.props.currentMEIndex);
      }
    } else if(e==="previous"){

      if(this.props.currentMEIndex > 0){
        this.props.checkMEOrg(this.props.currentMEIndex - 1);
      } else {
        this.props.checkMEOrg(this.props.currentMEIndex);
      }
    }

    this.setState({changeState: e});
  }

  handleStatus = () => {

  }



  callDefault = ({ classes }) => {
    return(
      <React.Fragment>
        <div className={classes.userArea}>
        <div>        
        {this.props.currentCat}
        <br />
        <br />
        {this.props.currentName}
        <br />
        <br />
        {this.props.currentAddr}
        <br />
        <br />
        {this.props.currentPrice}
        <br />
        <br />
        {this.props.currentTotal}
        <br />
        <br />
        {this.props.currentAvail}
        <br />
        <br />
        {this.props.currentSold}
        <br />
        <br />
        {this.props.currentStart}

        <br />
        <br />
        {this.props.currentEnd}

        <br />
        <br />
        {this.props.currentEventTime}

        <br />
        <br />
        {this.props.currentIncome}

        <br />
        <br />
        </div>
          <div>
          <button onClick={() => {this.handleChange("previous")}}>Previous</button>
          <button onClick={() => {this.handleChange("next")}}>Next</button>
          </div>
        </div>
        <div className={classes.buttonArea}>
        <button className={classes.homeButton} onClick={() => {
          this.props.clickHandler("default")
        }}>test</button>
        </div>
      </React.Fragment>
    );
  }



  render() {
    const {classes} = this.props;
    console.log(this.props.currentMELen);
    return this.callDefault({classes});

  }

}

ManageEvents.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  handleInvoke: PropTypes.func.isRequired
};

export default injectNOS(injectSheet(styles)(ManageEvents));
