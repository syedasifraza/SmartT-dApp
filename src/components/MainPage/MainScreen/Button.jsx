import React, {Component} from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

const styles = {

  btnContainer: {
    height: "25%",
    width: "25%",
    float: "left",
    paddingTop: "8.5%",
    paddingLeft: "2%",
    paddingRight: "2%",
    marginRight: "30px",
    textAlign: "center"
  },
  btn: {
    height: "100%",
    width: "100%",
    borderRadius: "10%",
    alignSelf: "center",
    border: "dotted",
    borderWidth: "2px",
    borderColor: "#ccc",
    background: "#2c8e75",
    '&:hover': {
      cursor: "pointer",
      background: "#3CB371"
    }
  },
  label: {
    margin: "0px",
    padding: "0px",
    color: "#fff",
    fontSize: "100%",
    paddingTop: "2px"
  }

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
        <h5 className={classes.label}>{this.props.title}</h5>
      </button>
    </div>
  );
}
}


Button.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(Button);
