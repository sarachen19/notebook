import React, { Component } from "react";
import ReactDOM from "react-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPager } from "@fortawesome/free-solid-svg-icons";
import OutsideClickHandler from "react-outside-click-handler";
import autosize from "autosize";
import "./allGroups.css";
import Checklist from "./checklist";
import AddTodo from "./addTodo";
import Label from "./label";
import Cover from "./cover";
import { cover_image_1 } from "./coverImages/cover_image_1";
import { cover_image_2 } from "./coverImages/cover_image_2";
import { cover_image_3 } from "./coverImages/cover_image_3";
import { cover_image_4 } from "./coverImages/cover_image_4";
import { cover_image_5 } from "./coverImages/cover_image_5";
import { cover_image_6 } from "./coverImages/cover_image_6";
import { cover_image_7 } from "./coverImages/cover_image_7";
import { cover_image_8 } from "./coverImages/cover_image_8";
import { cover_image_9 } from "./coverImages/cover_image_9";
import { cover_image_10 } from "./coverImages/cover_image_10";

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
			addLabel: false,
			addCover: false,
		};

		this.handleCloseModal = this.handleCloseModal.bind(this);

		this.editDescription = this.editDescription.bind(this);
		this.exitEditDescription = this.exitEditDescription.bind(this);
		this.GetDescription = this.GetDescription.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleDescriptionSubmit = this.handleDescriptionSubmit.bind(this);
		this.formref = React.createRef();

		this.coverRef = React.createRef();

		this.addChecklist = this.addChecklist.bind(this);
		this.onAddChecklists = this.onAddChecklists.bind(this);
		this.ShowAddChecklist = this.ShowAddChecklist.bind(this);
		this.Checklists = this.Checklists.bind(this);
		this.editTodoInput = React.createRef();

		this.addLabel = this.addLabel.bind(this);
		this.onAddLabels = this.onAddLabels.bind(this);
		this.Labels = this.Labels.bind(this);

		this.addCover = this.addCover.bind(this);
		this.onAddCovers = this.onAddCovers.bind(this);
		this.Covers = this.Covers.bind(this);
		this.displayCover = this.displayCover.bind(this);
		this.coverRef = React.createRef();
	}

	/*
	 *On close, update all values in newCard, remove the original card, then add newCard into cards property.
	 */
	handleCloseModal() {
		this.setState({ showModal: false });
		this.props.edit();
		this.props.onCardsChange();
	}

	/*
  --------------------Description handler--------------------
  */
	editDescription() {
		this.setState({ editDescription: true });
	}
	exitEditDescription() {
		this.setState({ editDescription: false });
	}
	handleDescriptionChange(e) {
		this.setState({ tempDescription: e.target.value });
	}
	handleDescriptionSubmit(e) {
		e.preventDefault();
		this.props.card.description = this.state.tempDescription;
	}
	GetDescription() {
		return (
			<Form
				onSubmit={this.handleDescriptionSubmit}
				style={{ margin: "0 20px 0 0" }}
			>
				<Form.Control
					ref={this.formref}
					as="textarea"
					rows="1"
					value={this.state.tempDescription}
					onClick={this.editDescription}
					onChange={this.handleDescriptionChange}
				/>
				<OutsideClickHandler
					onOutsideClick={this.exitEditDescription}
					display={"contents"}
				>
					{this.state.editDescription && (
						<button className="btn btn-success btn-sm" type="submit">
							Save
						</button>
					)}
				</OutsideClickHandler>
			</Form>
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
	ShowAddChecklist() {
		return (
			<div>
				<a
					href="#"
					title="checklist"
					role="button"
					className="btn btn-light sidebar-links"
					onClick={this.addChecklist}
				>
					<FontAwesomeIcon icon={faPager} style={{ marginRight: "10px" }} />
					<span className="sidebar-txt">Checklist</span>
				</a>
				<Overlay
					show={this.state.addChecklist}
					target={this.coverRef.current}
					placement="right"
					container={this.coverRef.current}
					containerPadding={20}
				>
					<OutsideClickHandler
						onOutsideClick={() => {
							this.setState({ addChecklist: false });
						}}
					>
						<Popover id="popover-contained-checklist">
							<Popover.Content>
								<Checklist
									addChecklist={true}
									card={this.props.card}
									onCardsChange={this.props.onCardsChange}
									onAddChecklists={this.onAddChecklists}
								/>
							</Popover.Content>
						</Popover>
					</OutsideClickHandler>
				</Overlay>
			</div>
		);
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
					<button className="btn btn-success btn-sm" type="submit">
						Submit
					</button>
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
			const ProgressBar = this.ProgessBar(checklist);
			return (
				<div key={index} className="div-u-gutter">
					<FontAwesomeIcon icon={faPager} className="modal-main-icon" />
					<p className="main-title">{checklist.checklistName}</p>
					{ProgressBar}
					{checklist.todo.map((todo, index) => {
						return (
							<div key={index}>
								<input
									className="modal-todo-checkbox"
									type="checkbox"
									onClick={() => this.toggleTodo(checklist, todo, index)}
									defaultChecked={todo.finished}
								></input>
								<li
									className="modal-todo"
									onClick={() => this.editTodo(checklist, todo, index)}
									id={checklist.key + "-" + index}
									style={{
										textDecoration: todo.finished ? "line-through" : "none",
									}}
								>
									{todo.text}
								</li>
							</div>
						);
					})}
					<AddTodo
						checklist={checklist}
						onCardsChange={this.props.onCardsChange}
					/>
				</div>
			);
		});
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
	/*
  --------------------Label handler--------------------
  */
	addLabel() {
		this.setState({ addLabel: !this.state.addLabel });
	}
	onAddLabels() {
		this.setState({ addLabels: false });
	}
	Labels() {
		return (
			<div>
				<a
					href="#"
					title="labels"
					role="button"
					className="btn btn-light sidebar-links"
					onClick={this.addLabel}
				>
					<FontAwesomeIcon icon={faPager} style={{ marginRight: "10px" }} />
					<span className="sidebar-txt">Labels</span>
				</a>

				<Overlay
					show={this.state.addLabel}
					target={this.coverRef.current}
					placement="right"
					arrowProps="none"
					container={this.coverRef.current}
					containerPadding={20}
				>
					<OutsideClickHandler
						onOutsideClick={() => {
							this.setState({ addLabel: false });
						}}
					>
						<Popover id="popover-contained-label" data-container="body">
							<Popover.Content>
								<Label
									addLabel={true}
									card={this.props.card}
									onCardsChange={this.props.onCardsChange}
									onAddLabels={this.onAddLabels}
								/>
							</Popover.Content>
						</Popover>
					</OutsideClickHandler>
				</Overlay>
			</div>
		);
	}
	/*
  --------------------cover handler--------------------
  */
	addCover() {
		this.setState({ addCover: !this.state.addCover });
	}
	onAddCovers() {
		this.setState({ addCover: true });
	}
	Covers() {
		return (
			<div>
				<a
					href="#"
					title="cover"
					role="button"
					className="btn btn-light sidebar-links"
					onClick={this.addCover}
				>
					<FontAwesomeIcon icon={faPager} style={{ marginRight: "10px" }} />
					<span className="sidebar-txt">Cover</span>
				</a>
				<Overlay
					show={this.state.addCover}
					target={this.coverRef.current}
					placement="right"
					arrowProps="none"
					container={this.coverRef.current}
					containerPadding={20}
				>
					<OutsideClickHandler
						onOutsideClick={() => {
							this.setState({ addCover: false });
						}}
					>
						<Popover id="popover-contained-cover" data-container="body">
							<Popover.Content>
								<Cover
									addCover={true}
									card={this.props.card}
									onCardsChange={this.props.onCardsChange}
									onAddCovers={this.onAddCovers}
								/>
							</Popover.Content>
						</Popover>
					</OutsideClickHandler>
				</Overlay>
			</div>
		);
	}
	coverStyle = {
		margin: "auto",
		height: "10rem",
		width: "100%",
		paddingTop: "4rem",
		textAlign: "center",
		borderRadius: "10px",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center center",
		backgroundSize: "cover",
		color: "white",
	};
	displayCover(ref) {
		if (ref === null || ref.current === null) return;
		var target = ref.current;
		const cover = this.props.card.cover;
		if (cover !== "") {
			target.style.height = "10rem";
			switch (cover) {
				case "cover_image_1":
					target.style.backgroundImage = "url(" + cover_image_1 + ")";
					break;
				case "cover_image_2":
					target.style.backgroundImage = "url(" + cover_image_2 + ")";
					break;
				case "cover_image_3":
					target.style.backgroundImage = "url(" + cover_image_3 + ")";
					break;
				case "cover_image_4":
					target.style.backgroundImage = "url(" + cover_image_4 + ")";
					break;
				case "cover_image_5":
					target.style.backgroundImage = "url(" + cover_image_5 + ")";
					break;
				case "cover_image_6":
					target.style.backgroundImage = "url(" + cover_image_6 + ")";
					break;
				case "cover_image_7":
					target.style.backgroundImage = "url(" + cover_image_7 + ")";
					break;
				case "cover_image_8":
					target.style.backgroundImage = "url(" + cover_image_8 + ")";
					break;
				case "cover_image_9":
					target.style.backgroundImage = "url(" + cover_image_9 + ")";
					break;
				case "cover_image_10":
					target.style.backgroundImage = "url(" + cover_image_10 + ")";
					break;
				default:
					target.style.backgroundImage = "";
					target.style.backgroundColor = cover;
					target.style.height = "3rem";
					break;
			}
		} else {
			target.style.height = "0";
			target.style.padding = "0";
		}
	}
	componentDidUpdate() {
		this.displayCover(this.coverRef);
	}

	/*
  --------------------description autosize and show cover--------------------
  */
	componentDidMount() {
		//autosize description
		autosize(this.formref.current);
		//show cover
		this.displayCover(this.coverRef);
	}

	render() {
		const ShowAddChecklist = this.ShowAddChecklist;
		const Labels = this.Labels;
		const Covers = this.Covers;
		const GetDescription = this.GetDescription;
		const Checklists = this.Checklists;
		return (
			<div>
				<Modal
					id="editCard-modal"
					show={this.state.showModal}
					onHide={this.handleCloseModal}
					scrollable
				>
					<Modal.Header
						closeButton
						ref={this.coverRef}
						className="editCard-modal-header-cover"
					>
						<Modal.Title style={{ width: "100%" }}>
							<p></p>
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="modal-body-header">
							<FontAwesomeIcon icon={faPager} className="modal-main-icon" />
							<h5 className="main-title">{this.props.card.value}</h5>
							<p id="edit-card-group-name">
								in group {this.props.group.groupName}
							</p>
						</div>
						<div className="modal-body-main">
							<div className="div-u-gutter">
								<div className="label-and-duedate-div">
									<p className="label-and-duedate-txt">labels</p>
									<Label
										card={this.props.card}
										onCardsChange={this.props.onCardsChange}
										onAddLabels={this.onAddLabels}
									/>
								</div>
								<div className="label-and-duedate-div">
									<p className="label-and-duedate-txt">due date</p>
								</div>
							</div>
							<div className="div-u-gutter">
								<FontAwesomeIcon icon={faPager} className="modal-main-icon" />
								<p className="main-title">Description</p>
								<GetDescription />
							</div>
							<Checklists />
							<div className="div-u-gutter">To be added</div>
						</div>
						<div className="modal-body-sidebar">
							<ShowAddChecklist />
							<Labels />
							<Covers />
						</div>
					</Modal.Body>
					<Modal.Footer></Modal.Footer>
				</Modal>
			</div>
		);
	}
}

export default EditCard;
