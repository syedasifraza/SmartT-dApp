import React, {Component} from "react";

class AboutButton extends Component {
    render() {
        return(
            <div className="About-button">
            <button onClick = { () => {
                    this.props.clickHandler();
            }} className="btn">
                <img src={require('../../img/about.png')} />
                <h5>About US</h5>
            </button>

            </div>
        );
    }
}

export default AboutButton;
