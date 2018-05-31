import React, {Component} from "react";
import FeaturedEventsTitle from "./FeaturedEventsTitle";
import FeaturedEvent from "./FeaturedEvent";

class UserDashboard extends Component {
    render() {
        return(
            <div className="userarea">
                <div className="search">
                    <input type="text" placeholder="Search events.." name="search" />
                    <button type="submit">
                        <img src={require('./../img/search.png')} />
                    </button>
                </div>
                <FeaturedEventsTitle />
                <FeaturedEvent />
                <FeaturedEvent />
                <FeaturedEvent />
                <FeaturedEvent />
                <FeaturedEvent />
                <FeaturedEvent />


            </div>
        );
    }
}

export default UserDashboard;
