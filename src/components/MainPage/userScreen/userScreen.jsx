import React, {Component} from 'react';
import PropTypes from 'prop-types';
import injectSheet from "react-jss";

import OutlinedButtons from "./OutlinedButtons";
import UserDashboard from "./UserDashboard";


const styles = {
  iconBar: {
    height: "8%",
    marginTop: "3px",
    marginLeft: "3.5px",
    width: "99.3%",
    background: "#2c8e75",
    overflow: "auto",
    borderRadius: "12px"
  },
  userArea: {
    height: "90%",
    overflow: "auto"

}
};


class UserScreen extends Component {

  state = {
    dashboard: "dashboard",
    dashboardState: true,
    mytickets: "mytickets",
    myticketsState: false,
    buytickets: "buytickets",
    buyticketsState: false,
    selltickets: "selltickets",
    sellticketsState: false,
    refundtickets: "refundtickets",
    refundticketsState: false
  }

  defaultStates = () => {
    this.setState({dashboardState: false});
    this.setState({myticketsState: false});
    this.setState({buyticketsState: false});
    this.setState({sellticketsState: false});
    this.setState({refundticketsState: false});
  }

  callMain = ({classes}) => {
        return(
          <React.Fragment>
          <div className={classes.iconBar}>
            <OutlinedButtons
              clickHandler = {this.props.clickHandler}
              check={this.props.check} />
          </div>
          <div className={classes.userArea}>
            <UserDashboard />
          </div>
          </React.Fragment>
        );
      }
  render() {
    const { classes } = this.props;
    return this.callMain({classes});
  }
}

UserScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(UserScreen);
