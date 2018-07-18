import React, {Component} from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import QrReader from 'react-qr-reader';

const styles = {
  reader: {
    width: "60%",
    textAlign: "center",
    maxWidth: "400",
    margin: ["30px", "auto"]

  }
};

class QRScanner extends Component {
  state = {
    delay: 300,
    result: null,
    status: 'idle',
  };

  handleClickScan = () => {
    const { status } = this.state;

    this.setState({
      result: null,
      status: status === 'reader' ? 'idle' : 'reader',
    });
  };

  handleScan = data => {
    if (data) {
      this.setState({
        result: data,
        status: 'idle',
      },
    () => this.props.handleCode(this.state.result));
    }
  };

  handleError = err => {
    console.error(err);
  };

  render() {
    const { result, status } = this.state;
    const output = {};
    const {classes} = this.props;

    if (status === 'reader') {
      output.reader = (

          <div className={classes.reader}>
            <QrReader
              delay={this.state.delay}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: '100%' }}
            />

        </div>

      );
    }

    return (
      <React.Fragment>
          <button className={classes.changeButton} onClick={this.handleClickScan}>
            {status === 'reader' ? 'STOP' : 'SCAN QRCode'}
          </button>

          {output.reader}

      </React.Fragment>
    );
  }
}

QRScanner.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,

};

export default injectSheet(styles)(QRScanner);
