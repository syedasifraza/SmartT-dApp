import React, {Component} from "react";

class HelpPage extends Component {
    render() {
        return(
            <div onClick = { () => {
                    this.props.clickHandler();
            }} className="middleCol2">
                <h1> Help Page Coming Soon! </h1>

            </div>
        );
    }
}

export default HelpPage;
