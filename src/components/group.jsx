import React, { Component } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Card from "./card";
import AllCards from "./allCards";
import Validators from "./validators";
import "./allGroups.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";
import autosize from "autosize";
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
		};

		this.addGroupSubmit = this.addGroupSubmit.bind(this);
		this.groupNameInput = React.createRef();
		this.txtEditGroupName = React.createRef();
		this.txtShowGroupName = React.createRef();
		this.submitEditGroupName = this.submitEditGroupName.bind(this);
		this.edit = this.edit.bind(this);
		this.deleteGroup = this.deleteGroup.bind(this);
	}
	componentDidMount() {
		autosize(this.txtEditGroupName.current);
		autosize(this.txtShowGroupName.current);
	}
	componentDidUpdate() {
		autosize(this.txtEditGroupName.current);
		autosize(this.txtShowGroupName.current);
	}
	addGroupSubmit(e) {
		e.preventDefault();
		const name = this.groupNameInput.current.value;
		if (Validators.isEmpty(name) === false) {
			let temp = this.state.group;
			temp.groupName = name;
			temp.key = this.props.count;
			this.setState({ group: temp, add: false });
			this.props.onGroupAdd(this.state.group);
		}
	}

	submitEditGroupName() {
		const tempName = this.txtEditGroupName.current.value;
		if (Validators.isEmpty(tempName) === false) {
			this.props.group.groupName = tempName;
			this.setState({ edit: false });
			this.props.onCardsChange();
		}
	}
	edit() {
		this.setState({ edit: true });
	}
	deleteGroup(e) {
		e.preventDefault();
		const temp = this.props.group;
		let all = this.props.allGroups.groups;
		all = all.filter((value, index) => value !== temp);
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
						<button type="submit" className="btn btn-success btn-sm">
							Add
						</button>
					</form>
				</OutsideClickHandler>
			);
		} else
			return (
				<>
					<div className="d-flex justify-content-between group-header">
						{this.state.edit && (
							<OutsideClickHandler
								display="contents"
								onOutsideClick={this.submitEditGroupName}
							>
								<textarea
									id="group-name-textarea"
									ref={this.txtEditGroupName}
									defaultValue={this.props.group.groupName}
								></textarea>
							</OutsideClickHandler>
						)}
						{!this.state.edit && (
							<textarea
								id="group-name-show"
								ref={this.txtShowGroupName}
								onClick={this.edit}
								onMouseOver={this.onMouseOverGroup}
								onMouseLeave={this.onMouseLeaveGroup}
								value={this.props.group.groupName}
								readOnly={true}
							></textarea>
						)}
						<Dropdown>
							<Dropdown.Toggle
								variant="success"
								size="sm"
								className="btn btn-outline-dark"
								style={{
									backgroundColor: "rgb(235, 236, 240)",
									border: "none",
								}}
							></Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item href="#" className="group-dropdown-menu">
									Action
								</Dropdown.Item>
								<Dropdown.Item href="#" className="group-dropdown-menu">
									Another action
								</Dropdown.Item>
								<Dropdown.Item
									href="#"
									className="group-dropdown-menu"
									onClick={this.deleteGroup}
								>
									Delete group
								</Dropdown.Item>
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
