import React, {Component} from 'react';
import PropTypes from 'prop-types';
import injectSheet from "react-jss";
import { react } from "@nosplatform/api-functions";
import { u, wallet } from "@cityofzion/neon-js";
import { unhexlify, hexlify }  from "binascii";


const { injectNOS } = react.default;
const ipfsAPI = require('ipfs-api');

const styles = {
  advertise:{}
};


class Advertisements extends Component {

  state = {

    createAds: false,
    adsArea: "",
    adsPrice: "",
    adsFrom: "",
    adsTo: "",
    url: "",
    fileHash: "",
    currentAds: [],
    currentIndex: "",
    viewAds: false,
    lastAdsDate: "",


  }


  handleChange = e => {
    if(e==="next"){
      if((this.state.currentIndex + 1) < this.state.currentAds.length) {
        this.setState({currentIndex: this.state.currentIndex+1})
      }
    } else if(e==="previous"){

      if(this.state.currentIndex > 0){
        this.setState({currentIndex: this.state.currentIndex-1})
      }
    }

  }

  captureFile = (e) => {
    e.stopPropagation()
    e.preventDefault()
    const file = e.target.files[0]
    let reader = new window.FileReader()
    reader.onloadend=()=>this.saveToIpfs(reader)
    reader.readAsArrayBuffer(file)
  }

  saveToIpfs = (reader) => {
    let ipfsId
    const buffer = Buffer.from(reader.result)
    this.ipfsApi.add(buffer, {progress: (prog) =>
      console.log(`received: ${prog}`)
    }).then(r => {
      console.log(r)
      ipfsId = r[0].hash
      console.log(ipfsId)
      this.setState({fileHash: ipfsId})
    }).catch(e => {
      console.error(e);
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    var from = new Date(this.state.adsFrom).getTime()/1000
    var to = new Date(this.state.adsTo).getTime()/1000
    var last = this.props.getDateTime(this.state.lastAdsDate)
    if(from < this.state.lastAdsDate){
        alert(`The Ads from Date should be greater or equal to: ${last}`)
    } else if (to <= from) {
      alert("Wrong date: Ads To should be greater than Ads From")
    } else {
      var charges = (((((to - from)/60)/60)/24)*this.state.adsPrice)
      console.log(charges)
      alert(`Make sure you have ${charges} MCT balance in your wallet.\nOtherwise transcation will not be process by Smart Contract`)
      this.props.handleInvoke(
        this.props.scriptHash,
        "transfer",
        [this.props.userAddress,
          this.props.dappHash,
          charges*100000000,
          hexlify("advertiseMe"),
          hexlify(this.state.adsArea),
          String(u.reverseHex(
            u.int2hex(from))),
          String(u.reverseHex(
            u.int2hex(to))),
          hexlify(this.state.fileHash),
          hexlify(this.state.url)],
          false).then(r => {
            this.props.clickHandler("default")
          });
    }
  }


  handleValues = e => {
    this.setState({[e.target.name]: e.target.value})

  }

  handleCreate = e => {
    if(this.props.bookedAds.length===0){
      this.setState({lastAdsDate: 0})
    } else {
      var i;
      for(i=0; i < this.props.bookedAds.length; i++){
        if(this.props.bookedAds[i][1]===e[0]
          && this.props.bookedAds[i][3]>this.state.lastAdsDate){
          this.setState({lastAdsDate: this.props.bookedAds[i][3]})
        }

      }
    }
    this.setState({adsArea: e[0]},
    ()=> this.setState({adsPrice: e[1]},
    ()=>this.setState({createAds: true})
    ))
  }

  handleViewAds = e => {
    var check=false
    if(this.props.bookedAds.length===0){
      alert("No Ads found!")
    } else {
      var i;
      let q = this.state.currentAds.slice();
      for(i=0; i < this.props.bookedAds.length; i++){
        if(this.props.bookedAds[i][1]===e[0]){
          q.push(this.props.bookedAds[i])
          this.setState({currentAds: q})
          check=true
        }

      }
    }
    if(check){
      this.setState({currentIndex: 0},
      ()=>this.setState({viewAds: true}))
    } else {
      alert("No Ads found for this AdArea!")
    }

  }

  callDefault = ({classes}) => {
    return(
      <React.Fragment>
        <div className={classes.userArea}>
          <div className={classes.heading}>
           Ads Areas!
          </div>
          <div className={classes.container}>

          {
            this.props.adsAreas.map((d, index) => {
              return(
              <React.Fragment key={index}>
                <div className={classes.col30}>
                  <div className={classes.eventDetails}>
                    Ads Area:
                    <strong> {d[0]} </strong>
                  </div>

                  <div className={classes.eventName}>
                    Charges (24 hours):
                    <strong> {d[1]} MCTs </strong>
                  </div>
                  <div className={classes.eventBuy}>
                    <button
                      onClick={()=>{this.handleViewAds(d)}}>
                      View Ads</button>
                    <button
                      onClick={()=>{this.handleCreate(d)}}>
                      Create Ads</button>
                  </div>

                </div>
              </React.Fragment>

              )
            })
          }



          <div className={classes.row}>
          </div>
        </div>
        </div>
        <div className={classes.buttonArea}>
        <button className={classes.homeButton} onClick={() => {
          this.props.clickHandler("default")
        }}>Home</button>
        </div>
      </React.Fragment>
    );
  }

  createAds = ({ classes }) => {
    return(
      <React.Fragment>
        <div className={classes.userArea}>
        <div className={classes.heading}>
          Create Ads Form
        </div>
        <div className={classes.container}>
          <form onSubmit={this.handleSubmit}>
          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Wallet Address:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
                {wallet.getAddressFromScriptHash(
                u.reverseHex(this.props.userAddress))}</label>
            </div>
          </div>
            <div className={classes.row}>
              <div className={classes.col25}>
                <label className={classes.label}>Ads Area:</label>
              </div>
              <div className={classes.col75}>
                <label className={classes.label2}>{this.state.adsArea}</label>
              </div>
            </div>

            <div className={classes.row}>
              <div className={classes.col25}>
                <label className={classes.label}>Ads Charges (24 hours):</label>
              </div>
              <div className={classes.col75}>
                <label className={classes.label2}>{this.state.adsPrice}</label>
              </div>
            </div>

            <div className={classes.row}>
              <div className={classes.col25}>
                <label className={classes.label}>Ads from:</label>
              </div>
              <div className={classes.col75}>
                <input className={classes.input}
                  id="adsFrom"
                  name="adsFrom"
                  type="datetime-local"
                  value={this.state.adsFrom}
                  onChange={this.handleValues}
                  placeholder="Required field..."
                  required />
              </div>
            </div>

            <div className={classes.row}>
              <div className={classes.col25}>
                <label className={classes.label}>Ads to:</label>
              </div>
              <div className={classes.col75}>
                <input className={classes.input}
                  id="adsTo"
                  name="adsTo"
                  type="datetime-local"
                  value={this.state.adsTo}
                  onChange={this.handleValues}
                  placeholder="Required field..."
                  required />
              </div>
            </div>

            <div className={classes.row}>
              <div className={classes.col25}>
                <label className={classes.label}>OnClick URL:</label>
              </div>
              <div className={classes.col75}>
                <input className={classes.input}
                  id="url"
                  name="url"
                  type="text"
                  value={this.state.url}
                  onChange={this.handleValues}
                  placeholder="Required field..."
                  required />
              </div>
            </div>

            <div className={classes.row}>
              <div className={classes.col25}>
                <label className={classes.label}>Upload Ads File:</label>
              </div>
              <div className={classes.col75}>
                <input className={classes.input}
                  type="file"
                  onChange={this.captureFile}
                  />
              </div>
            </div>


            <div className={classes.row}>
              <input className={classes.submit_btn}
                type="submit" value="Submit" />

            </div>
          </form>
        </div>

        </div>
        <div className={classes.buttonArea}>
        <button className={classes.homeButton} onClick={() => {
          this.props.clickHandler("default")
        }}>Home</button>
        </div>
      </React.Fragment>
    );
  }


  viewAds = ({classes}) => {
    return(
      <React.Fragment>
      <div className={classes.userArea}>
      <div className={classes.heading}>
        Advertisement #: <label> {this.state.currentIndex + 1}/{this.state.currentAds.length}</label>
      </div>
      <div className={classes.container}>

        <div className={classes.eventBuy}>

          <button className={classes.changeButton}
            onClick={() => {this.handleChange("previous")}}>Previous</button>


          <button className={classes.changeButton}
            onClick={() => {this.handleChange("next")}}>Next</button>
        </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Wallet Address:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {wallet.getAddressFromScriptHash(
              u.reverseHex(this.state.currentAds[this.state.currentIndex][0]))}
                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Ads Area:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
                {this.state.currentAds[this.state.currentIndex][1]}
                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Ads start date:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.getDateTime(
                this.state.currentAds[this.state.currentIndex][2])}
                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Ads end date:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.props.getDateTime(
                this.state.currentAds[this.state.currentIndex][3])}
                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Ads ipfs file Hash:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.state.currentAds[this.state.currentIndex][4]}
                </label>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Ads OnClick URL:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.state.currentAds[this.state.currentIndex][5]}
                </label>
            </div>
          </div>


          <div className={classes.row}>
            <div className={classes.col25}>
              <label className={classes.label}>Total Charged Amount:</label>
            </div>
            <div className={classes.col75}>
              <label className={classes.label2}>
              {this.state.currentAds[this.state.currentIndex][6]/100000000} MCTs
                </label>
            </div>
          </div>


          <div className={classes.row}>
          </div>

      </div>
      </div>

      <div className={classes.buttonArea}>
      <button className={classes.homeButton} onClick={() => {
        this.props.clickHandler("default")
      }}>Home</button>
      </div>
      </React.Fragment>
    );
  }

  render() {
    const {classes} = this.props;
    this.ipfsApi = ipfsAPI('150.183.234.117', '5001')

    if(this.state.createAds){
      return this.createAds({classes})
    } else if(this.state.viewAds){
      return this.viewAds({classes})
    } else {
      return this.callDefault({classes});
    }

  }

}

Advertisements.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  handleInvoke: PropTypes.func.isRequired
};

export default injectNOS(injectSheet(styles)(Advertisements));
