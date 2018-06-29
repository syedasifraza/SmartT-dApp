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

  callMain = ({classes}) => {
        return(
          <React.Fragment>
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
