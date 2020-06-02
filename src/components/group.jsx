import React, { Component } from "react";

import Card from "./card";
import AllCards from "./allCards";

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
    };

    this.addGroupSubmit = this.addGroupSubmit.bind(this);
    this.groupNameInput = React.createRef();
  }

  addGroupSubmit(e) {
    e.preventDefault();
    const name = this.groupNameInput.current.value;
    let temp = this.state.group;
    temp.groupName = name;
    temp.key = this.props.count;
    this.setState({ group: temp, add: false });
    this.props.onGroupAdd(this.state.group);
  }
  render() {
    if (this.state.add) {
      return (
        <form onSubmit={this.addGroupSubmit}>
          <input type="text" ref={this.groupNameInput}></input>
          <button type="submit">Add</button>
        </form>
      );
    }

    return (
      <div>
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
      </div>
    );
  }
}
export default Group;
