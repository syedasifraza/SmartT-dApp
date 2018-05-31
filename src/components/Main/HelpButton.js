import React, {Component} from "react";

class HelpButton extends Component {
    render() {
        return(
            <div className="Help-button">
            <button onClick = { () => {
                    this.props.clickHandler();
            }} className="btn">
                <img src={require('../../img/help.png')} />
                <h5>Help</h5>
            </button>

            </div>
        );
    }
}

export default HelpButton;
