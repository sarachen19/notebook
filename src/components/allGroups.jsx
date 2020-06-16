import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Group from "./group";
import "./allGroups.css";
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
    this.onGroupExchange = this.onGroupExchange.bind(this);
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
  onGroupExchange(group1, group2) {
    const k1 = group1.key;
    const k2 = group2.key;
    let allGroups = this.state.allGroups.groups;
    allGroups[k1] = group2;
    allGroups[k2] = group1;
    group2.key = k1;
    group1.key = k2;
    this.setState({
      allGroups: { groups: allGroups },
    });
    //console.log(allGroups);
    //this.forceUpdate();
  }
  onGroupAdd(group) {
    if (group !== null) {
      let temp = this.state.allGroups.groups;
      temp = [...temp, group];
      this.setState({
        allGroups: { groups: temp },
        add: false,
      });
    } else {
      this.setState({
        add: false,
      });
    }
  }
  onCardsChange() {
    this.localStore();
    this.forceUpdate();
  }
  showAllGroups() {
    const groups = this.state.allGroups.groups;
    const allGroups = groups.map((group, index) => {
      return (
        <GroupTargetBox
          style={{ height: "100%" }}
          key={index}
          group={group}
          allGroups={this.state.allGroups}
          onCardsChange={this.onCardsChange}
          onGroupExchange={this.onGroupExchange}
        />
      );
    });
    return <div className="d-flex">{allGroups}</div>;
  }

  render() {
    const AllGroups = this.showAllGroups;
    return (
      <div className="d-flex" style={{ height: "100%" }}>
        <span className="flex-columnx order-1">
          {!this.state.add && (
            <button
              onClick={(e) => {
                e.preventDefault();
                this.setState({ add: true });
              }}
            >
              Add group
            </button>
          )}
          {this.state.add && (
            <Group
              add={this.state.add}
              count={this.state.allGroups.groups.length}
              onGroupAdd={this.onGroupAdd}
            />
          )}
        </span>
        <AllGroups />
      </div>
    );
  }
}

export default AllGroups;
