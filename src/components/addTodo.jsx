import React, { Component } from "react";
class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = { newTodo: { text: "", finished: false } };
    this.todoInput = React.createRef();
    this.onAddTodoSubmit = this.onAddTodoSubmit.bind(this);
  }
  onAddTodoSubmit(e) {
    e.preventDefault();
    const newTodoText = this.todoInput.current.value;
    this.props.checklist.todo = [
      ...this.props.checklist.todo,
      { text: newTodoText, finished: false },
    ];
    this.props.onCardsChange();
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onAddTodoSubmit}>
          <input type="text" placeholder="to do" ref={this.todoInput}></input>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default AddTodo;
