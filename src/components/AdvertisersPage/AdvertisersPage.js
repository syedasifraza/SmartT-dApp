import React, {Component} from "react";

class AdvertisersPage extends Component {
    render() {
        return(
            <div onClick = { () => {
                    this.props.clickHandler();
            }} className="middleCol2">
                <h1> Advertisers Page Coming Soon! </h1>
            </div>
        );
    }
}

export default AdvertisersPage;
