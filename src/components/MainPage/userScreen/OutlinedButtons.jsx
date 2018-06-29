import React, {Component} from 'react';
import PropTypes from 'prop-types';
import injectSheet from "react-jss";

const styles = {
  active: {
    backgroundColor: "#3CB371",
    height: "100%"
  },
  menutext: {
    margin:"0px",
    paddingTop: "15px",
    fontSize: "100%",
    color: "#fff",
    fontStyle: "normal"
  },
  button: {
    height: "100%",
    float: "left",
    width: "16.666%",
    textAlign: "center",
    padding: "0px",
    transition: ["all", "0.3s", "ease"],
    "&:hover": {
      backgroundColor: "#3CB371",
      cursor: "pointer"
    }
  }

};

class OutlinedButtons extends Component {
  render() {
  const { classes } = this.props;
  return (
    <React.Fragment>
      <a  className={classes.button}>
      <div className={classes.active}>
        <h5 className={classes.menutext}>Dashboard</h5>
      </div>
      </a>

      <a className={classes.button}>
      <div>
        <h5 className={classes.menutext}>My Tickets</h5>
      </div>
      </a>

      <a className={classes.button}>
      <div>
        <h5 className={classes.menutext}>Buy Tickets</h5>
      </div>
      </a>

      <a className={classes.button}>
      <div>
        <h5 className={classes.menutext}>Sell Tickets</h5>
      </div>
      </a>

      <a className={classes.button}>
      <div>
        <h5 className={classes.menutext}>Refund Tickets</h5>
      </div>
      </a>

      <a className={classes.button}>
      <div onClick = { () => {
            this.props.clickHandler(this.props.check);
          }}>
        <h5 className={classes.menutext}>Back</h5>
      </div>
      </a>

    </React.Fragment>
  );
}
}

OutlinedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(OutlinedButtons);
