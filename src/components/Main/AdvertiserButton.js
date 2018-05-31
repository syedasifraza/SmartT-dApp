import React, {Component} from "react";

class AdvertiserButton extends Component {
    render() {
        return(
            <div className="Advertiser-button">
            <button onClick = { () => {
                    this.props.clickHandler();
            }} className="btn">
                <img src={require('../../img/advertise.png')} />
                <h5>Advertisers</h5>
            </button>

            </div>
        );
    }
}

export default AdvertiserButton;
