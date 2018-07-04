import React, {Component} from 'react';
import PropTypes from 'prop-types';
import injectSheet from "react-jss";


const styles = {
  userArea: {
    height: "100%",
    overflow: "auto",
    border: "solid"

}
};


class BuyTickets extends Component {

  callMain = ({classes}) => {
        return(
          <React.Fragment>
          <div className={classes.userArea}>
            Buy Tickets
          </div>
          </React.Fragment>
        );
      }
  render() {
    const { classes } = this.props;
    return this.callMain({classes});
  }
}

BuyTickets.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(BuyTickets);
