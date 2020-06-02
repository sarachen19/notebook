import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Group from "./group";
import "./main.css";
import { GroupTargetBox } from "./groupTargetBox";

class AllGroups extends Component {
  static id = 0;
  constructor(props) {
    super(props);
    this.state = {
      allGroups: { groups: [] },
      newGroup: "",
      add: false,
    };

    this.showAllGroups = this.showAllGroups.bind(this);
    this.onGroupAdd = this.onGroupAdd.bind(this);
    this.onCardsChange = this.onCardsChange.bind(this);
    this.localStore = this.localStore.bind(this);
  }
  componentDidMount() {
    if (localStorage.getItem("group") !== null)
      this.setState({
        allGroups: { groups: JSON.parse(localStorage.getItem("group")) },
      });
  }
  localStore() {
    //put all groups data into local storage
    var cache = [];
    const groups = this.state.allGroups.groups;
    JSON.stringify(groups, (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (cache.includes(value)) return;
        cache.push(value);
        localStorage.setItem("group", JSON.stringify(value));
        return;
      }
    });
    cache = null;
  }

  onGroupAdd(group) {
    let temp = this.state.allGroups.groups;
    temp = [...temp, group];
    this.setState({
      allGroups: { groups: temp },
      add: false,
    });
  }
  onCardsChange() {
    this.localStore();
    this.forceUpdate();
  }
  showAllGroups() {
    const groups = this.state.allGroups.groups;
    const allGroups = groups.map((group, index) => {
      return (
        <div key={index}>
          <GroupTargetBox
            key={index}
            group={group}
            allGroups={this.state.allGroups}
            onCardsChange={this.onCardsChange}
          />
        </div>
      );
    });
    return <div className="d-inline-flex">{allGroups}</div>;
  }

  render() {
    const AllGroups = this.showAllGroups;
    return (
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            this.setState({ add: true });
          }}
        >
          Add group
        </button>
        {this.state.add && (
          <Group
            add={this.state.add}
            count={this.state.allGroups.groups.length}
            onGroupAdd={this.onGroupAdd}
          />
        )}
        <AllGroups />
      </div>
    );
  }
}

export default AllGroups;
