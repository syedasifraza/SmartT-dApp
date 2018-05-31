import React, {Component} from "react";

class AboutPage extends Component {
    render() {
        return(
            <div onClick = { () => {
                    this.props.clickHandler();
            }} className="middleCol2">
                <h1> About US Page Coming Soon! </h1>

            </div>
        );
    }
}

export default AboutPage;
