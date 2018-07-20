import React, {Component} from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import {QRCode} from 'react-qr-svg';

const styles = {
  qrtickets:{}

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
