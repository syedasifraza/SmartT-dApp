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
    padding: "50px"
  },
  formLabel: {
    color: "#fff",
    paddingRight: "30px"
  }
};


class ApplyWhitelisting extends Component {

  callMain = ({classes}) => {
        return(
          <React.Fragment>
          <div className={classes.userArea}>

            <form className={classes.formArea} onSubmit={this.handleSubmit}>
              <label className={classes.formLabel}>Name of Organization: </label>
              <input id="orgname" name="orgname" type="text" />
              <br />
              <label className={classes.formLabel}>Contact Person: </label>
              <input id="person" name="person" type="text" />
              <br />
              <label className={classes.formLabel}>Email Address: </label>
              <input id="email" name="eamil" type="email" />
              <br />
              <label>Phone Number: </label>
              <input id="phone" name="phone" type="text" />
              <br />
              <label>Wallet address: </label>
              <label>xyz</label>
              <br />
              <label>MCT Charges: </label>
              <label>0.00000001</label>
              <br />


              <button>Send data!</button>
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
