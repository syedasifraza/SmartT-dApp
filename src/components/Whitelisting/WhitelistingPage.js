import React, {Component} from "react";

class WhitelistingPage extends Component {
    render() {
        return(
            <div onClick = { () => {
                    this.props.clickHandler();
            }} className="middleCol2">
                <h1> Organizers Whitelisting Page Coming Soon! </h1>
            </div>
        );
    }
}

export default WhitelistingPage;
