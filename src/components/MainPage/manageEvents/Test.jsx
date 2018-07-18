import React, {Component} from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import QrReader from 'react-qr-reader';

const styles = {
  test: {}
};

class Test extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 300,
      result: 'No result',
    }
    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(data){
    if(data){
      this.setState({
        result: data,
      })
    }
  }
  handleError(err){
    console.error(err)
  }
  render(){
    const {classes} = this.props
    return(
      <div>
        <QrReader
          delay={this.state.delay}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
          />
        <p>{this.state.result}</p>
      </div>
    )
  }
}

Test.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,

};

export default injectSheet(styles)(Test);
