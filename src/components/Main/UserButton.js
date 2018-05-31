import React, {Component} from "react";

class UserButton extends Component {
    render() {
        return (
            <div className="User-button">
            <button onClick = { () => {
                    this.props.clickHandler();
            }} className="btn">
                <img src={require('../../img/user.png')} />
                <h5>Tickets User</h5>
            </button>

            </div>
        );
    }
}

export default UserButton;
