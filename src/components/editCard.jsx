import React, { Component } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import OutsideClickHandler from "react-outside-click-handler";
import Checklist from "./checklist";
import AddTodo from "./addTodo";
Modal.setAppElement("#root");

class EditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCard: this.props.card,
      tempDescription: this.props.card.description,
      newChecklist: "",
      showModal: true,
      editDescription: false,
      addChecklist: false,
    };
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.editDescription = this.editDescription.bind(this);
    this.DescriptionWithOutsideClick = this.DescriptionWithOutsideClick.bind(
      this
    );
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDescriptionSubmit = this.handleDescriptionSubmit.bind(this);

    this.addChecklist = this.addChecklist.bind(this);
    this.onAddChecklists = this.onAddChecklists.bind(this);
    this.Checklists = this.Checklists.bind(this);

    this.editTodoInput = React.createRef();
  }

  /*
   *On close, update all values in newCard, remove the original card, then add newCard into cards property.
   */
  handleCloseModal() {
    this.setState({ showModal: false });
    this.props.edit(false);
    this.props.group.cards.forEach((card) => {
      if (card === this.state.currentCard) {
        card.description = this.state.tempDescription;
        this.props.onCardsChange();
      }
    });
  }

  /*
  --------------------Description handler--------------------
  */
  editDescription() {
    this.setState({ editDescription: true });
  }
  handleDescriptionChange(e) {
    this.setState({ tempDescription: e.target.value });
  }
  handleDescriptionSubmit(e) {
    e.preventDefault();
  }
  DescriptionWithOutsideClick() {
    return (
      <OutsideClickHandler
        onOutsideClick={() => {
          this.setState({
            editDescription: false,
          });
        }}
      >
        <form
          onClick={this.editDescription}
          onSubmit={this.handleDescriptionSubmit}
        >
          <textarea
            type="textfield"
            placeholder="Add some description"
            value={this.state.tempDescription}
            onChange={this.handleDescriptionChange}
          />
          <br />
          {this.state.editDescription && <button type="submit">Save</button>}
        </form>
      </OutsideClickHandler>
    );
  }

  /*
  --------------------Checklist handler--------------------
  */
  onAddChecklists() {
    this.setState({ addChecklist: false }); //增加结束 恢复默认值 参数传入Checklist
  }
  addChecklist() {
    this.setState({ addChecklist: true }); //点击增加时
  }

  /*
  --------------------Todo handler--------------------
  */
  toggleTodo(checklist, oneTodo, todoIndex) {
    checklist.todo.forEach((value, index) => {
      if (index === todoIndex) {
        value.finished = !value.finished;
      }
    });
    this.props.onCardsChange();
  }
  editTodo(checklist, todo, index) {
    ReactDOM.render(
      <OutsideClickHandler
        onOutsideClick={() => {
          ReactDOM.unmountComponentAtNode(
            document.getElementById(checklist.key + "-" + index)
          );
          ReactDOM.render(
            todo.text,
            document.getElementById(checklist.key + "-" + index)
          );
        }}
      >
        <form onSubmit={(e) => this.editTodoSubmit(e, checklist, todo, index)}>
          <input
            type="text"
            defaultValue={todo.text}
            ref={this.editTodoInput}
          ></input>
          <button type="submit">Submit</button>
        </form>
      </OutsideClickHandler>,
      document.getElementById(checklist.key + "-" + index)
    );
  }
  editTodoSubmit(e, checklist, todo, todoIndex) {
    e.preventDefault();
    const tempTodo = this.editTodoInput.current.value;
    const targetId = checklist.key + "-" + todoIndex;
    checklist.todo.forEach((value, index) => {
      const tempId = checklist.key + "-" + index;
      if (tempId === targetId) {
        checklist.todo[index].text = tempTodo;
      }
    });
    ReactDOM.unmountComponentAtNode(
      document.getElementById(checklist.key + "-" + todoIndex)
    );
    ReactDOM.render(
      tempTodo,
      document.getElementById(checklist.key + "-" + todoIndex)
    );
    this.props.onCardsChange();
  }

  /*
  --------------------one card's checklist and todo render--------------------
  */
  Checklists() {
    const checklists = this.props.card.checklists;
    return checklists.map((checklist, index) => {
      return (
        <div key={index}>
          <p>{checklist.checklistName}</p>
          <ul>
            {checklist.todo.map((todo, index) => {
              return (
                <div key={index}>
                  <input
                    type="checkbox"
                    onClick={() => this.toggleTodo(checklist, todo, index)}
                    style={{ display: "inline-block" }}
                  ></input>
                  <li
                    onClick={() => this.editTodo(checklist, todo, index)}
                    id={checklist.key + "-" + index}
                    style={{
                      textDecoration: todo.finished ? "line-through" : "none",
                      display: "inline-block",
                    }}
                  >
                    {todo.text}
                  </li>
                </div>
              );
            })}
          </ul>
          <AddTodo
            checklist={checklist}
            onCardsChange={this.props.onCardsChange}
          />
        </div>
      );
    });
  }

  render() {
    const DescriptionWithOutsideClick = this.DescriptionWithOutsideClick;
    const Checklists = this.Checklists;
    return (
      <Modal isOpen={this.state.showModal} contentLabel={"edit card"}>
        <h3>{this.props.card.value}</h3>
        <div id="description">
          <h3>Description</h3>
          <DescriptionWithOutsideClick />
        </div>
        <div id="divChecklist">
          <Checklists />
        </div>
        <div>Activity</div>
        <button onClick={this.addChecklist} id="btnaddChecklist">
          Checklist
        </button>
        {this.state.addChecklist && (
          <Checklist
            addChecklist={this.state.addChecklist}
            card={this.props.card}
            group={this.props.group}
            onCardsChange={this.props.onCardsChange}
            onAddChecklists={this.onAddChecklists}
          />
        )}
        <button onClick={this.handleCloseModal}>Close Modal</button>
      </Modal>
    );
  }
}

export default EditCard;
