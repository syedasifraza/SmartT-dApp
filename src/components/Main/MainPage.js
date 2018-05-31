import React, {Component} from "react";
import UserButton from "./UserButton";
import OrganizerButton from "./OrganizerButton";
import AdvertiserButton from "./AdvertiserButton";
import WhitelistButton from "./WhitelistButton";
import AboutButton from "./AboutButton";
import HelpButton from "./HelpButton";
import MainTitle from "./MainTitle"
import UserPage from "./../UsersPage/UserPage"
import OrganiserPage from "./../OrganisersPage/OrganiserPage"
import WhitelistingPage from "./../Whitelisting/WhitelistingPage"
import AdvertisersPage from "./../AdvertisersPage/AdvertisersPage"
import AboutPage from "./../AboutPage/AboutPage"
import HelpPage from "./../HelpPage/HelpPage"

class MainPage extends Component {
    state = {
        user: false,
        organizer: false,
        whitelist: false,
        advertiser: false,
        about: false,
        help: false
    }

    changeUser = () => {
        var statechnaged = !this.state.user;
        this.setState({user: statechnaged});
    }

    changeOrg = () => {
        var statechnaged = !this.state.organiser;
        this.setState({organiser: statechnaged});
    }

    changeWhitelist = () => {
        var statechnaged = !this.state.whitelist;
        this.setState({whitelist: statechnaged});
    }

    changeAds = () => {
        var statechnaged = !this.state.advertiser;
        this.setState({advertiser: statechnaged});
    }

    changeAbout = () => {
        var statechnaged = !this.state.about;
        this.setState({about: statechnaged});
    }

    changeHelp = () => {
        var statechnaged = !this.state.help;
        this.setState({help: statechnaged});
    }

    callMain = () => {
        return(
            <div className = "middleCol2">
              <MainTitle />
            <div className="center_middleCol2">
                <div className="buttons-container">
                    <div className="button1">
                        <UserButton clickHandler={this.changeUser} />
                    </div>
                    <div className="button2"><OrganizerButton clickHandler={this.changeOrg} /> </div>
                    <div className="button3"> <WhitelistButton clickHandler={this.changeWhitelist} /> </div>
                    <div className="button4"> <AdvertiserButton clickHandler={this.changeAds}/> </div>
                    <div className="button5"><AboutButton clickHandler={this.changeAbout}/> </div>
                    <div className="button6"><HelpButton clickHandler={this.changeHelp}/> </div>
                </div>
            </div>
            </div>
        );
    }

    callUser = () => {
        return(
            <UserPage clickHandler={this.changeUser} />

        );
    }
    callOrganiser = () => {
        return(
            <OrganiserPage clickHandler={this.changeOrg} />

        );
    }

    callWhitelist = () => {
        return(
            <WhitelistingPage clickHandler={this.changeWhitelist} />

        );
    }

    callAdvertiser = () => {
        return(
            <AdvertisersPage clickHandler={this.changeAds} />

        );
    }

    callAbout = () => {
        return(
            <AboutPage clickHandler={this.changeAbout} />

        );
    }

    callHelp = () => {
        return(
            <HelpPage clickHandler={this.changeHelp} />

        );
    }

    render() {
        if(this.state.user) {
            return this.callUser();
        } else if(this.state.organiser) {
            return this.callOrganiser();
        } else if(this.state.whitelist) {
            return this.callWhitelist();
        } else if(this.state.advertiser) {
            return this.callAdvertiser();
        } else if(this.state.about) {
            return this.callAbout();
        } else if(this.state.help) {
            return this.callHelp();
        } else {
            return this.callMain();
        }
    }
}

export default MainPage;
