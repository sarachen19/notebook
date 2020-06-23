import React, { Component } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import "bootstrap/dist/css/bootstrap.min.css";

class AddTodo extends Component {
	constructor(props) {
		super(props);
		this.state = { newTodo: { text: "", finished: false }, add: false };
		this.todoInput = React.createRef();
		this.onAddTodoSubmit = this.onAddTodoSubmit.bind(this);
		this.add = this.add.bind(this);
		this.hideAdd = this.hideAdd.bind(this);
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
	add(e) {
		e.preventDefault();
		this.setState({ add: true });
	}
	hideAdd(e) {
		e.preventDefault();
		this.setState({ add: false });
	}
	render() {
		return (
			<div>
				<form onSubmit={this.onAddTodoSubmit}>
					<OutsideClickHandler onOutsideClick={this.hideAdd}>
						<input
							className="form-control"
							row="1"
							type="text"
							placeholder="add to do"
							ref={this.todoInput}
							onClick={this.add}
						></input>
						{this.state.add && (
							<button className="btn btn-success btn-sm" type="submit">
								Add
							</button>
						)}
					</OutsideClickHandler>
				</form>
			</div>
		);
	}
}

export default AddTodo;
