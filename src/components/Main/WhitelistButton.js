import React, {Component} from "react";

class WhitelistButton extends Component {
    render() {
        return(
            <div className="Whitelist-button">
            <button onClick = { () => {
                    this.props.clickHandler();
            }} className="btn">
                <img src={require('../../img/handshake.png')} />
                <h5>Organizer's Whitelisting</h5>
            </button>

            </div>
        );
    }
}

export default WhitelistButton;
