import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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
		this.AddChecklist = this.AddChecklist.bind(this);
		this.checklistInput = React.createRef();
	}
	getFinishedTodo(checklist) {
		let count = 0;
		let total = 0;
		checklist.todo.forEach((todo) => {
			if (todo.finished === true) {
				count++;
			}
			total++;
		});
		const percentage = parseInt((count / total) * 100);
		const width = percentage + "%";
		return (
			<div className="progress" style={{ height: "10px" }}>
				<div
					className="progress-bar bg-warning"
					style={{ width: width, height: "10px" }}
				>
					{percentage}%
				</div>
			</div>
		);
	}
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

	AddChecklist() {
		return (
			<form onSubmit={this.handleAddChecklistSubmit} id="addChecklistForm">
				<input
					type="text"
					placeholder="enter checklist name"
					ref={this.checklistInput}
					defaultValue="Checklist"
				/>
				<button type="submit">Add</button>
			</form>
		);
	}
	render() {
		if (this.state.addChecklist) {
			return <this.AddChecklist />;
		} else if (this.props.checklist !== undefined)
			return (
				<div className="d-flex-row justify-content-right">
					<p className="mr-auto">{this.props.checklist.checklistName}</p>
					{this.getFinishedTodo(this.props.checklist)}
					{/*<FontAwesomeIcon icon={faCheck} />*/}
					{/*<ul>
              {this.props.checklist.todo.map((todo, index) => {
                return <li key={index}>{todo.text}</li>;
              })}
            </ul>*/}
				</div>
			);
		else return null;
		//return this.state.addChecklist && <this.AddChecklist />;
	}
}
export default Checklist;
