import React, {Component} from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

const styles = {

  buttons:{}

};

class Button extends Component {
  render() {
  const {classes, children} = this.props;
  return(
    <div className={classes.btnContainer}>
      <button onClick = { () => {
            this.props.clickHandler(this.props.check);
          }} className={classes.btn}>
        {children}
        <h5 className={classes.btnlabel}>{this.props.title}</h5>
      </button>
    </div>
  );
}
}


Button.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(Button);
