import React, {Component} from 'react';
import PropTypes from 'prop-types';
import injectSheet from "react-jss";


const styles = {
  userArea: {
    height: "100%",
    overflow: "auto",
    border: "solid"

},
  formArea: {
    paddingTop: "80px",
    marginLeft:"250px"

  },
  formLabel: {
    color: "#fff",
    paddingRight: "10px"
  },
  formInput: {
    margin: "30px"
  }
};


class ApplyWhitelisting extends Component {

  callMain = ({classes}) => {
        return(
          <React.Fragment>
          <div className={classes.userArea}>

            <form className={classes.formArea} onSubmit={this.handleSubmit}>
              <label className={classes.formLabel}>Organization Name: </label>
              <input className={classes.formInput} id="orgname" name="orgname" type="text" />
              <br />
              <label className={classes.formLabel}>Contact Person: </label>
              <input className={classes.formInput} id="person" name="person" type="text" />
              <br />
              <label className={classes.formLabel}>Email Address: </label>
              <input className={classes.formInput} id="email" name="eamil" type="email" />
              <br />
              <label className={classes.formLabel}>Phone Number: </label>
              <input className={classes.formInput} id="phone" name="phone" type="text" />
              <br />
              <label className={classes.formLabel}>Wallet address: </label>
              <label className={classes.formInput}>{this.props.userAddr}</label>
              <br />
              <br />
              <label className={classes.formLabel}>MCT Charges: </label>
              <label className={classes.formInput}>0.00000001</label>
              <br />
              <br />



              <button>Apply</button>
            </form>

          </div>
          </React.Fragment>
        );
      }
  render() {
    const { classes } = this.props;
    return this.callMain({classes});
  }
}

ApplyWhitelisting.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(ApplyWhitelisting);
