import React, {Component} from "react";

class FeaturedEvent extends Component {
    render() {
        return(
            <div className="featuredeventMain">
                <div className="date-area">
                    <h5>15 June</h5>
                </div>
                <div className="eventname">
                    <h5>Movie Event</h5>
                </div>
                <div className="eventpic">
                    <h5>Yusang-gu, Neong-da ro, Deajeon, S.Korea</h5>
                </div>
                <div className="eventbuy">
                    Buy Tickets
                </div>
            </div>
        );
    }
}

export default FeaturedEvent;
