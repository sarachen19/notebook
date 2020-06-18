import React, { Component } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Card from "./card";
import AllCards from "./allCards";
import Validators from "./validators";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

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
    this.deleteGroup = this.deleteGroup.bind(this);

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
  deleteGroup(e) {
    e.preventDefault();
    const temp = this.props.group;
    let all= this.props.allGroups.groups;
    all = all.filter((value,index) => value !== temp);
    this.props.allGroups.groups = all;
    this.props.onCardsChange();
  }
  onMouseOverGroup(e) {
    e.currentTarget.style.border = "2px solid rgb(215, 220, 220)";
    e.currentTarget.style.borderRadius = "6px";
    e.currentTarget.style.cursor = "pointer";
  }
  onMouseLeaveGroup(e) {
    e.currentTarget.style.border = "none";
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
          <div className="d-flex justify-content-between">
            {this.state.edit && <OutsideClickHandler onOutsideClick={this.submitEditGroupName}>
              <textarea
                //onClick={this.showChangeGroupName}
                ref={this.txtGroupName}
                defaultValue={this.props.group.groupName}
                //onChange={(e)=>this.setState({tempName:e.target.value})}
                //style={groupNameStyle}
              ></textarea>
            </OutsideClickHandler>}
            {!this.state.edit && <p onClick={this.edit} onMouseOver={this.onMouseOverGroup} onMouseLeave={this.onMouseLeaveGroup}>{this.props.group.groupName}</p>}
            <Dropdown>
              <Dropdown.Toggle variant="success" size="sm" className="btn btn-outline-dark" style={{backgroundColor: "rgb(235, 236, 240)", border : "none"}}>
                <FontAwesomeIcon icon={faEllipsisH} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">Action</Dropdown.Item>
                <Dropdown.Item href="#">Another action</Dropdown.Item>
                <Dropdown.Item href="#" onClick={this.deleteGroup}>Delete group</Dropdown.Item>
              </Dropdown.Menu>
          </Dropdown>
          </div>
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
