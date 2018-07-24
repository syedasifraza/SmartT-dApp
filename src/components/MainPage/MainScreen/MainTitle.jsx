import React, {Component} from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";


const styles = {

  mainTitle:{}

};


class MainTitle extends Component {
  render() {
    const { classes, children } = this.props;
    return (
    <div className={classes.middleCol_Top}>
      <h3 className={classes.mainTitle_Label}>
        {children}
      </h3>
    </div>
    );
  }
}


MainTitle.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(MainTitle);
