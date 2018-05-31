import React, {Component} from "react";

class OrganizerButton extends Component {
    render() {
        return(
            <div className="Organizer-button">
            <button onClick = { () => {
                    this.props.clickHandler();
            }} className="btn">
                <img src={require('../../img/organiser.png')} />
                <h5>Tickets Organizer</h5>
            </button>

            </div>
        );
    }
}

export default OrganizerButton;
