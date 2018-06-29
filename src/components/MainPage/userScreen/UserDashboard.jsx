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
                    <input className={classes.search}
                      type="text"
                      placeholder="Search events.."
                      name="search" />
                    <button type="submit">
                      Search
                    </button>
                    <DashTitle>Featured Events</DashTitle>
                </div>
          </React.Fragment>

        );
    }
}

UserDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(UserDashboard);
