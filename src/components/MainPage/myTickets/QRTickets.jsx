import React, {Component} from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import {QRCode} from 'react-qr-svg';

const styles = {
  qrLabel: {
    width: "25%",
    display: "inline-block",
    float: "left",
    fontSize: "17px",
    resize: "vertical",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  idLabel: {
    width: "100%",
    padding: ["12px", "0px", "12px", "0px"],
    display: "inline-block",
    fontSize: "17px",
    resize: "vertical",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    border: ["1px", "solid", "#000"],

  },

  eventLabel: {
    width: "60%",
    display: "inline-block",
    fontSize: "20px",
    resize: "vertical",
    justifyContent: "left",
    alignItems: "left",
    textAlign: "left",
  },
  extraLabel: {
    width: "32%",
    display: "inline-block",
    fontSize: "15px",
    resize: "vertical",
    justifyContent: "left",
    alignItems: "left",
    textAlign: "left",
    paddingTop: "5px",
    paddingBottom: "5px"
  },

};

class QRTickets extends Component {
  render() {
  const {classes} = this.props;
  return(
    <React.Fragment>
    <div className={classes.row}>
      <div className={classes.col100}>
      <label className={classes.idLabel}>
      Ticket(s) ID: {this.props.ticketHash}
      </label>
        <label className={classes.qrLabel}>
        QR Code
        <br />
        <QRCode level="Q"
          style={{width: 100}}
          value={this.props.ticketHash} />
        </label>
        <label className={classes.eventLabel}>

          <strong> {this.props.currentCat}, {this.props.currentTitle}
          </strong>
          <br />
          {this.props.eventAddress}
          <br />
          {this.props.eventDate}
        </label>
        <label className={classes.extraLabel}>
        Status: {this.props.ticketStatus}
        </label>
        <label className={classes.extraLabel}>
        Tickets: {this.props.ticketQty}
        </label>
        <label className={classes.extraLabel}>
        Price: {this.props.ticketPrice} MCT
        </label>
        <label className={classes.extraLabel}>
        Order date: {this.props.orderDate}
        </label>
      </div>
    </div>
    </React.Fragment>
  );
}
}


QRTickets.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(QRTickets);
