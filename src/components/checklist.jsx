import React, { Component } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import AllGroups from "./allGroups";

class Checklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newChecklist: {
        key: this.props.card.checklists.length,
        checklistName: "",
        todo: [],
      },
      addChecklist: this.props.addChecklist || false,
    };
    this.handleAddChecklistSubmit = this.handleAddChecklistSubmit.bind(this);
    this.ChecklistWithOutsideClick = this.ChecklistWithOutsideClick.bind(this);
    this.checklistInput = React.createRef();
  }

  /*
  todoSubmit(e) {
    e.preventDefault();
    this.setState({
      todo: [...this.state.todo, this.todoInput.current.value],
    });

    const newChecklist = (
      <Checklist
        key={this.props.key}
        add={false}
        checklistName={this.state.checklistName}
        todo={this.state.todo}
        cardName={this.state.cardName}
        cardKey={this.state.cardKey}
      />
    );
    this.props.updateCard(this.props.card, newChecklist);
  }
*/

  handleAddChecklistSubmit(e) {
    e.preventDefault();
    this.setState({ addChecklist: false });
    const checklistName = this.checklistInput.current.value;
    const tempChecklist = this.state.newChecklist;
    tempChecklist.checklistName = checklistName;
    this.setState({ newChecklist: tempChecklist });
    this.props.card.checklists = [
      ...this.props.card.checklists,
      this.state.newChecklist,
    ];
    this.props.onAddChecklists(); //增加结束 修改 EditCard - addChecklist state to false
    this.props.onCardsChange();
  }

  ChecklistWithOutsideClick() {
    return (
      <OutsideClickHandler
        onOutsideClick={() => {
          this.setState({ addChecklist: false });
          this.props.onAddChecklists(); //取消增加 修改 EditCard - addChecklist state to false
        }}
      >
        <form onSubmit={this.handleAddChecklistSubmit} id="addChecklistForm">
          <input
            type="text"
            placeholder="enter checklist name"
            ref={this.checklistInput}
            defaultValue="Checklist"
          />
          <button type="submit"></button>
        </form>
      </OutsideClickHandler>
    );
  }
  render() {
    if (this.state.addChecklist) {
      return <this.ChecklistWithOutsideClick />;
    } else {
      return (
        <div>
          <p>{this.props.checklist.checklistName}</p>
          <ul>
            {this.props.checklist.todo.map((todo, index) => {
              return <li key={index}>{todo.text}</li>;
            })}
          </ul>
        </div>
      );
    }
    //return this.state.addChecklist && <this.ChecklistWithOutsideClick />;
  }
}
export default Checklist;
