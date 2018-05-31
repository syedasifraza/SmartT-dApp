import React, {Component} from "react";

class OrganiserPage extends Component {
    render() {
        return(
            <div onClick = { () => {
                    this.props.clickHandler();
            }} className="middleCol2">
                <h1> Organizers Page Coming Soon! </h1>
            </div>
        );
    }
}

export default OrganiserPage;
