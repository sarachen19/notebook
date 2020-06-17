import React, { Component } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Card from "./card";
import AllCards from "./allCards";
import Validators from "./validators";

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
      edit: false,
      showChangeGroupName: false,
      //tempName: this.props.group !== undefined ? this.props.group.groupName : '',
    };
 
    this.addGroupSubmit = this.addGroupSubmit.bind(this);
    this.groupNameInput = React.createRef();
    //this.showChangeGroupName = this.showChangeGroupName.bind(this);
    //this.hideChangeGroupName = this.hideChangeGroupName.bind(this);
    this.txtGroupName = React.createRef();
    this.submitEditGroupName = this.submitEditGroupName.bind(this);
    this.edit = this.edit.bind(this);
  }

  addGroupSubmit(e) {
    e.preventDefault();
    const name = this.groupNameInput.current.value;
    if (Validators.isEmpty(name) === false) {
      let temp = this.state.group;
      temp.groupName = name;
      temp.key = this.props.count;
      this.setState({ group: temp, add: false, });
      this.props.onGroupAdd(this.state.group);
    }
  }


  submitEditGroupName() {
    const tempName = this.txtGroupName.current.value;
    if (Validators.isEmpty(tempName) === false) {
      //this.hideChangeGroupName();
      this.props.group.groupName = tempName;
      this.setState({edit:false});
      this.props.onCardsChange();
    } else {
      //this.hideChangeGroupName();
    }
  }
  edit() {
    this.setState({edit: true});
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
          {this.state.edit && <OutsideClickHandler onOutsideClick={this.submitEditGroupName}>
            <textarea
              //onClick={this.showChangeGroupName}
              ref={this.txtGroupName}
              defaultValue={this.props.group.groupName}
              //onChange={(e)=>this.setState({tempName:e.target.value})}
              //style={groupNameStyle}
            ></textarea>
          </OutsideClickHandler>}
          {!this.state.edit && <p onClick={this.edit}>{this.props.group.groupName}</p>}
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
