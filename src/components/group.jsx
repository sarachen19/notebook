import React, { Component } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Card from "./card";
import AllCards from "./allCards";
import Validators from "./validators";

const groupNameStyle = {
  height: "30px",
  border: "none",
  resize: "none",
  cursor: "default",
  overflow: "hidden",
  backgroundColor: "rgb(235, 236, 240)",
};

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: {
        groupName: "",
        cards: [],
        key: "",
      },
      add: this.props.add || false,
      showChangeGroupName: false,
    };

    this.addGroupSubmit = this.addGroupSubmit.bind(this);
    this.groupNameInput = React.createRef();
    this.showChangeGroupName = this.showChangeGroupName.bind(this);
    this.hideChangeGroupName = this.hideChangeGroupName.bind(this);
    this.txtGroupName = React.createRef();
    this.submitEditGroupName = this.submitEditGroupName.bind(this);
    this.getGroupName = this.getGroupName.bind(this);
  }

  addGroupSubmit(e) {
    e.preventDefault();
    const name = this.groupNameInput.current.value;
    if (Validators.isEmpty(name) === false) {
      let temp = this.state.group;
      temp.groupName = name;
      temp.key = this.props.count;
      this.setState({ group: temp, add: false });
      this.props.onGroupAdd(this.state.group);
    }
  }
  showChangeGroupName(e) {
    e.target.select();
    this.txtGroupName.current.style.height = "5px";
    this.txtGroupName.current.style.height =
      this.txtGroupName.current.scrollHeight + "px";
    this.txtGroupName.current.style.backgroundColor = "white";
  }
  hideChangeGroupName() {
    this.txtGroupName.current.style.height = "30px";
    this.txtGroupName.current.style.backgroundColor = "rgb(235, 236, 240)";
  }
  submitEditGroupName() {
    const tempName = this.txtGroupName.current.value;
    if (Validators.isEmpty(tempName) === false) {
      this.hideChangeGroupName();
      this.props.group.groupName = tempName;
      this.props.onCardsChange();
    } else {
      //this.hideChangeGroupName();
    }
  }
  auto_grow(element) {
    element.style.height = "5px";
    element.style.height = element.scrollHeight + "px";
  }

  getGroupName() {
    return this.props.group.groupName;
  }
  render() {
    if (this.state.add) {
      return (
        <OutsideClickHandler
          onOutsideClick={() => {
            this.props.onGroupAdd(null);
          }}
        >
          <form onSubmit={this.addGroupSubmit}>
            <input
              type="text"
              ref={this.groupNameInput}
              defaultValue=""
            ></input>
            <br />
            <button type="submit">Add</button>
          </form>
        </OutsideClickHandler>
      );
    } else
      return (
        <>
          <p>{this.props.group.groupName}</p>
          <AllCards
            key={this.props.group.key}
            group={this.props.group}
            onCardsChange={this.props.onCardsChange}
          />
          <Card
            add={true}
            count={this.props.group.cards.length}
            group={this.props.group}
            onCardsChange={this.props.onCardsChange}
          />
        </>
      );
  }
}
export default Group;
