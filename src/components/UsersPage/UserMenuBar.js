import React, {Component} from "react";

class UserMenuBar extends Component {
    render() {
        return (
    <div  className="icon-bar">
      <a  className={this.props.dashboard.dashboard ? "active" : ""} href="#">
      <i onClick = { () => {
              this.props.clickHandler1(this.props.dashboard.d);
      }} className="menuText">
      <h5>Dashboard</h5>
      </i>
      </a>
      <a className={this.props.dashboard.mytickets ? "active" : ""} href="#">
      <i onClick = { () => {
              this.props.clickHandler1(this.props.dashboard.my);
      }} className="menuText">

      <h5>My Ticket(s)</h5>
      </i>
      </a>
      <a className={this.props.dashboard.buytickets ? "active" : ""} href="#">
      <i onClick = { () => {
              this.props.clickHandler1(this.props.dashboard.buy);
      }} className="menuText">

      <h5>Buy Ticket(s)</h5></i>
      </a>
      <a className={this.props.dashboard.selltickets ? "active" : ""} href="#">
      <i onClick = { () => {
              this.props.clickHandler1(this.props.dashboard.sell);
      }} className="menuText">

      <h5>Sell Ticket(s)</h5></i>
      </a>
      <a className={this.props.dashboard.refundtickets ? "active" : ""} href="#">
      <i onClick = { () => {
              this.props.clickHandler1(this.props.dashboard.refund);
      }} className="menuText">

      <h5>Refund Ticket(s)</h5></i>
      </a>
      <a href="#">
      <i onClick = { () => {
              this.props.clickHandler();
      }} className="menuText">

      <h5>Back</h5></i>
      </a>
</div>
);
}
}

export default UserMenuBar;
