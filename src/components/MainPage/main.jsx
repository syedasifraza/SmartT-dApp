import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import {Logo, Titles, Followus} from "./Logo";
import {AdsCenter, AdsTop, AdsBottom} from "./Ads";
import {MainScreen} from "./MainScreen";

const styles = {
  wrapper: {
  background: "linear-gradient(to right, #8FBC8F, #3CB371)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflowY: "auto",
  overflowX: "hidden"
},

main: {
  height: "90vh",
  background: "#ddd",
  width: "90%",
  margin: ["15px", "auto"],
  display: "table"

},

leftCol: {
    height: "100%",
    float: "left",
    width: "15%",

},

leftCol_top: {
    height: "20%",
    display: "table",

},

leftCol_center: {
    height: "50%",
    background: "#fff",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#fff",
    display: "table",
    border: "2px",
    borderRadius: "5px",
},

leftCol_bottom: {
    height: "30%",
    display: "table",
},

rightCol: {
    height: "100%",
    display: "table",
    width: "10%",
    background: "#fff"
},

rightCol_top: {
    height: "20%",
    display: "table"

},
rightCol_center: {
    height: "60%",
    display: "table"

},

rightCol_bottom: {
    height: "20%",
    display: "table"

},
AdsTop: {
  width: "100%",
  paddingTop: "3px"
},
AdsCenter: {
  width: "100%",
  padding: "0px"

},

Logo_img: {
  width: "100%",
  alignContent:"center",
},
title_container: {
  backgroundSize: "100%",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  color: "#fff",


},

title_container__title: {
  margin: "0px",
  paddingTop: "140px",
  fontSize: "25px",
  letterSpacing: 5,
  color: "#000",
  fontFamily: 'Roboto Slab',


},

title_container__subtitle: {
  margin: "0px",
  paddingTop: "10px",
  alignItems: "center",
  fontSize: "12px",
  justifyContent: "center",
  textAlign: "center",
  fontStyle:  "normal",
  fontWeight: 50,
  letterSpacing: 1,
  lineHeight: 1.2,
  color: "#000",
  fontFamily: "Roboto Slab",

},
icons: {
  width: "15%",
  padding: "8px",
  flex: "left"
},
iconsLabel: {
  margin: 0,
  paddingTop: "15px",
  paddingBottom: "20px",
  paddingLeft: "5px",
  fontSize: "15px",
  fontStyle: "italic"
},

middleCol: {
    height: "100%",
    float: "left",
    width: "75%",
    paddingTop: 0,
    background: "#2c3f50",
    display: "table"
},

middleCol_Center: {
  height: "90%",
  paddingTop: "5%",
  paddingLeft: "14%"

},

buttonsContainer: {




},
img: {
  margin: "0px",
  padding: "0px",
  width: "60px",
  height: "60px"
},

userArea: {
  height: "97%",
  overflowY: "auto",
  overflowX: "hidden"
},

buttonArea: {
  hieght: "3.2%",
  display: "flex",
  justifyContent: "center",
  paddingTop: "2px",



},
homeButton: {
  width: "10%",
  fontSize: "15px",
  border: ["1px", "solid", "#ccc"],
  borderRadius: "4px",
  background: "#ccc",
  '&:hover': {
    cursor: "pointer",
    background: "#a2a2a2"
  }

},
heading_deploy: {
  padding: "10px",
  margin: "20px",
  marginTop: "50px",
  marginBottom: "0px",
  fontSize: "20px",
  display: "flex",
  color: "#2c8e75",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  border: ["1px", "solid", "#ccc"],
  borderRadius: ["5px","5px", "5px", "5px"],
  backgroundColor: "#f2f2f2",


},
heading: {
  padding: "20px",
  margin: "20px",
  marginTop: "50px",
  marginBottom: "0px",
  border: ["1px", "solid", "#ccc"],
  borderRadius: ["5px","5px", "0px", "0px"],
  display: "flex",
  fontSize: "25px",
  color: "#2c8e75",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#ccc"

},

container: {
  borderRadius: ["0px","0px", "5px", "5px"],
  backgroundColor: "#f2f2f2",
  padding: "20px",
  margin: "20px",
  marginTop: "0px"

},

col100: {
  width: "95%",
  float: "left",
  wordWrap: "break-word",
  border:["2px", "solid", "#000"],
  borderRadius: "5px",
  marginLeft: "15px",
  marginBottom: "20px",
  marginTop: "20px"
},

col95: {
  width: "95%",
  float: "left",
  marginLeft: "10px",
  marginBottom: "10px",
  marginTop: "20px"
},

col45: {
  width: "45%",
  margin:"10px",
  float: "left",
  wordWrap: "break-word",
  border:["2px", "solid", "#aaa"],
  background:"linear-gradient(to top, #5CA571, #ddd)",
  borderRadius: "5px",
  marginBottom: "20px",
  marginTop: "20px"
},

col30: {
  width: "28%",
  margin:"10px",
  float: "left",
  wordWrap: "break-word",
  border:["2px", "solid", "#aaa"],
  background: "linear-gradient(to top, #5CA571, #ddd)",
  borderRadius: "5px",
  marginBottom: "20px",
  marginTop: "20px"
},

col20: {
  float: "left",
  width: "20%",
  marginTop: "20px"
},
col40: {
  float: "left",
  width: "45%",
  marginTop: "20px"
},
col15: {
  float: "left",
  width: "15%",
  marginTop: "10px"
},

col25: {
  float: "left",
  width: "30%",
  marginTop: "20px"
},

col75: {
  float: "left",
  width: "65%",
  marginTop: "20px",
},

row:{
  content: "",
  clear: "both"
},
label: {
  padding: ["12px", "12px", "12px", "0px"],
  display: "inline-block",
  fontSize: "15px"
},
label2: {
  width: "100%",
  padding: ["12px", "12px", "12px", "12px"],
  display: "inline-block",
  border: ["1px", "solid", "#ccc"],
  borderRadius: "4px",
  resize: "vertical"
},
input: {
  width: "100%",
  padding: "12px",
  border: ["1px", "solid", "#ccc"],
  borderRadius: "4px",
  resize: "vertical"
},
submit_btn: {
  width: "100%",
  marginTop: "20px",
  fontSize: "20px",
  padding: "6px",
  border: ["1px", "solid", "#ccc"],
  borderRadius: "6px",
  background: "#3CB371",
  '&:hover': {
    cursor: "pointer",
    background: "#2c8e75"
  }
},
changeButton: {
  width: "18%",
  fontSize: "10px",
  marginLeft: "5px",
  paddingTop: "7px",
  paddingBottom: "7px",
  border: ["1px", "solid", "#ccc"],
  borderRadius: "4px",
  background: "#3CB371",
  '&:hover': {
    cursor: "pointer",
    background: "#2c8e75"
  }
},

eventDetails: {
  width: "100%",
  float: "left",
  paddingTop: "10px",
  paddingBottom: "10px",
  textAlign: "center",
  fontSize: "17px",
  borderBottom: ["1px", "solid", "#fff"],
  backgroundColor: "#aaa"

},

eventCat: {
  width: "100%",
  paddingTop: "10px",
  paddingBottom: "10px",
  float: "left",
  textAlign: "center",
  fontSize: "15px"
},
eventName: {
  width: "100%",
  float: "left",
  textAlign: "center",
  fontSize: "15px",
  borderTop: ["1px", "solid", "#fff"],
  borderBottom: ["1px", "solid", "#fff"],
  paddingTop: "15px",
  paddingBottom: "15px"
},
eventAddress: {
  width: "100%",
  float: "left",
  textAlign: "center",
  fontSize: "15px",
  borderBottom: ["1px", "solid", "#fff"],
  paddingTop: "15px",
  paddingBottom: "15px"
},
eventBuy: {
  width: "100%",
  float: "left",
  textAlign: "center",
  fontSize: "15px",
  paddingTop: "5px",
  paddingBottom: "5px"
},

middleCol_Top: {
  height: "50px",
  marginTop: "2px",
  marginLeft: "1px",
  marginRight: "1px",
  paddingTop: "0px",
  border: ["2px", "none", "#fff"],
  borderRadius: "10px",
  background:"linear-gradient(to top, #5CA571, #ddd)"
},
mainTitle_Label: {
  margin: 0,
  paddingTop: "15px",
  color: "#2c3f50",
  fontFamily: "sans-serif",
  textAlign: "center",
  alignItems: "center"
},

btnContainer: {
  width: "20%",
  float: "left",
  padding: "2%",
  margin: "20px",
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
  
},
btn: {
  height: "100%",
  width: "100%",
  paddingTop: "15%",
  paddingBottom: "15%",
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
btnlabel: {
  margin: "0px",
  padding: "0px",
  color: "#fff",
  fontSize: "100%",
  paddingTop: "2px"
},
reader: {
  width: "40%",
  textAlign: "center",
  maxWidth: "400",
  margin: ["30px", "auto"]

},
unlock: {
  width: "100%",
  marginLeft: "40px",
  padding: "10px",
  display: "table",
  fontSize: "12px",
  resize: "vertical",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  borderRadius: "4px",
  border: ["1px", "solid", "#ccc"],
  background: "#3CB371",
  '&:hover': {
    cursor: "pointer",
    background: "#2c8e75"
  }

},

qrLabel: {
  width: "25%",
  paddingTop: "10px",
  paddingBottom: "15px",
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
  paddingTop: "10px",
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

myTkt_btn:{
  marginRight: "20px"
}


};

const Main = ({ classes }) => (
  <div className={classes.wrapper}>
  <div className={classes.main}>
  <div className={classes.leftCol}>
    <div className={classes.leftCol_top}><Logo classes={classes} /></div>
    <div className={classes.leftCol_center} ><Titles classes={classes} /></div>
     <div className={classes.leftCol_bottom}><Followus classes={classes} /></div>
  </div>

  <MainScreen classes={classes} />

  <div className={classes.rightCol}>
    <div className={classes.rightCol_top}><AdsTop classes={classes} /></div>
    <div className={classes.rightCol_center}><AdsCenter classes={classes} /></div>
    <div className={classes.rightCol_bottom}><AdsBottom classes={classes} /></div>

  </div>
  </div>
  </div>
);

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(Main);
