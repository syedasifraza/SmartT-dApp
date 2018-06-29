import React, {Component} from 'react';
import PropTypes from 'prop-types';
import injectSheet from "react-jss";

const styles = {
  dashLabel: {
    marginTop: "20px",
    fontSize: "30px",
    textAlign: "center",
    color: "#fff"
  }
};

class DashTitle extends Component {
    render() {
      const { classes, children } = this.props;
        return(
            <div className={classes.dashLabel}>
                {children}
            </div>
        );
    }
}


DashTitle.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(DashTitle);
