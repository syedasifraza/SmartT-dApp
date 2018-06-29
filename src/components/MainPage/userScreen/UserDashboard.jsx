import React, {Component} from 'react';
import PropTypes from 'prop-types';
import injectSheet from "react-jss";
import DashTitle from "./DashTitle";

const styles = {
  search: {
    marginTop: "40px",
    width: "85%",
    marginLeft: "5%",

  }
};

class UserDashboard extends Component {
    render() {
      const { classes } = this.props;
        return(
          <React.Fragment>
                <div>
                    <DashTitle>Events List</DashTitle>
                </div>
          </React.Fragment>

        );
    }
}

UserDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(UserDashboard);
