import React, {Component} from "react";
import UserMenuBar from "./UserMenuBar";
import UserDashboard from "./dashboard/UserDashboard";
import UserMyTickets from "./dashboard/UserMyTickets";
import UserBuyTickets from "./dashboard/UserBuyTickets";
import UserSellTickets from "./dashboard/UserSellTickets";
import UserRefundTickets from "./dashboard/UserRefundTickets";
import FeaturedEventsTitle from "./dashboard/FeaturedEventsTitle";

class UserPage extends Component {
    state = {
        d: "dashboard",
        dashboard: true,
        my: "mytickets",
        mytickets: false,
        buy: "buytickets",
        buytickets: false,
        sell: "selltickets",
        selltickets: false,
        refund: "refundtickets",
        refundtickets: false
    }

    changeDashboardStates = (e) => {
        this.defaultStates();
        if(e === "dashboard"){
            this.setState({dashboard: true});
        }
        if(e === "mytickets"){
            this.setState({mytickets: true});
        }
        if(e === "buytickets"){
            this.setState({buytickets: true});
        }
        if(e === "selltickets"){
            this.setState({selltickets: true});
        }
        if(e === "refundtickets"){
            this.setState({refundtickets: true});            
        }

    }

    defaultStates = () => {
        this.setState({dashboard: false});
        this.setState({mytickets: false});
        this.setState({buytickets: false});
        this.setState({selltickets: false});
        this.setState({refundtickets: false});
    }

    callMain = () => {
        return(
            <div  className="middleCol2">
                <UserMenuBar clickHandler = {this.props.clickHandler}
                    clickHandler1 = {this.changeDashboardStates} dashboard={this.state}/>
                <UserDashboard />

            </div>
        );
    }

    callMy = () => {
        return(
            <div  className="middleCol2">
                <UserMenuBar clickHandler = {this.props.clickHandler}
                    clickHandler1 = {this.changeDashboardStates} dashboard={this.state}/>
                <UserMyTickets />
            </div>
        );
    }

    callBuy = () => {
        return(
            <div  className="middleCol2">
                <UserMenuBar clickHandler = {this.props.clickHandler}
                    clickHandler1 = {this.changeDashboardStates} dashboard={this.state}/>
                <UserBuyTickets />
            </div>
        );
    }

    callSell = () => {
        return(
            <div  className="middleCol2">
                <UserMenuBar clickHandler = {this.props.clickHandler}
                    clickHandler1 = {this.changeDashboardStates} dashboard={this.state}/>
                <UserSellTickets />
            </div>
        );
    }

    callRefund = () => {
        return(
            <div  className="middleCol2">
                <UserMenuBar clickHandler = {this.props.clickHandler}
                    clickHandler1 = {this.changeDashboardStates} dashboard={this.state}/>
                <UserRefundTickets />
            </div>
        );
    }

    render() {

        if(this.state.dashboard){
            return this.callMain();
        } else if(this.state.mytickets){
            return this.callMy();
        } else if(this.state.buytickets){
            return this.callBuy();
        } else if(this.state.selltickets){
            return this.callSell();
        } else if(this.state.refundtickets){
            return this.callRefund();
        } else {
            return this.callMain();
        }

    }
}

export default UserPage;
