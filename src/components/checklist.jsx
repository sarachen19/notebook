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
		this.Checklist = this.Checklist.bind(this);
	}
	ProgessBar(checklist) {
		if (checklist.todo.length === 0) {
			return null;
		} else {
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
				<div
					className="progress"
					style={{ height: "10px", backgroundColor: "#FEEFC1" }}
				>
					<div
						className="progress-bar"
						style={{
							width: width,
							height: "10px",
							backgroundColor: "#f8ce4f",
						}}
					>
						{percentage}%
					</div>
				</div>
			);
		}
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
				<button className="btn btn-success btn-sm" type="submit">
					Add
				</button>
			</form>
		);
	}
	toggleTodo(e, checklist, oneTodo, todoIndex) {
		e.stopPropagation();
		checklist.todo.forEach((value, index) => {
			if (index === todoIndex) {
				value.finished = !value.finished;
			}
		});
		this.props.onCardsChange();
	}

	Checklist() {
		const checklist = this.props.checklist;
		return (
			<div>
				<div className="d-flex align-items-center">
					<span className="dot"></span>
					<p>{"  " + checklist.checklistName}</p>
				</div>
				{this.ProgessBar(this.props.checklist)}
				{checklist.todo.map((todo, index) => {
					return (
						<div key={index}>
							<p
								className="todo-text-indent"
								style={{
									textDecoration: todo.finished ? "line-through" : "none",
									display: "inline-block",
								}}
								key={index}
								onClick={(e) => this.toggleTodo(e, checklist, todo, index)}
							>
								{todo.text}
							</p>
						</div>
					);
				})}
			</div>
		);
	}
	render() {
		if (this.state.addChecklist) {
			return <this.AddChecklist />;
		} else if (this.props.checklist !== undefined) {
			const Checklist = this.Checklist;
			return (
				<Checklist />
				/*
				<div className="d-flex-row justify-content-right">
					<p className="mr-auto">{this.props.checklist.checklistName}</p>
					{this.ProgessBar(this.props.checklist)}
				</div>
				*/
			);
		} else return null;
		//return this.state.addChecklist && <this.AddChecklist />;
	}
}
export default Checklist;
