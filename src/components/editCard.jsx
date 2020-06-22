import React, { Component } from "react";
import ReactDOM from "react-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
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

		this.Info = this.Info.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);

		this.editDescription = this.editDescription.bind(this);
		this.exitEditDescription = this.exitEditDescription.bind(this);
		this.GetDescription = this.GetDescription.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleDescriptionSubmit = this.handleDescriptionSubmit.bind(this);
		this.formref = React.createRef();

		this.popoverRef = React.createRef();

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
		this.coverSyleRef = React.createRef();
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
				<Form.Label>Description</Form.Label>
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
					{this.state.editDescription && <button type="submit">Save</button>}
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
				<button onClick={this.addChecklist}>Checklist</button>
				<Overlay
					show={this.state.addChecklist}
					target={this.popoverRef.current}
					placement="right"
					container={this.popoverRef.current}
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
	/*
  --------------------one card's info--------------------
  */
	Info() {
		const GetDescription = this.GetDescription;
		const Checklists = this.Checklists;
		return (
			<>
				<Label
					card={this.props.card}
					onCardsChange={this.props.onCardsChange}
					onAddLabels={this.onAddLabels}
				/>
				<GetDescription />
				<Checklists />
				<div>Activity</div>
			</>
		);
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
				<button onClick={this.addLabel}>Label</button>
				<Overlay
					show={this.state.addLabel}
					target={this.popoverRef.current}
					placement="right"
					arrowProps="none"
					container={this.popoverRef.current}
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
				<button onClick={this.addCover}>Cover</button>
				<Overlay
					show={this.state.addCover}
					target={this.popoverRef.current}
					placement="right"
					arrowProps="none"
					container={this.popoverRef.current}
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
		this.displayCover(this.coverSyleRef);
	}

	/*
  --------------------description autosize and show cover--------------------
  */
	componentDidMount() {
		//autosize description
		autosize(this.formref.current);
		//show cover
		this.displayCover(this.coverSyleRef);
	}

	render() {
		const Info = this.Info;
		const ShowAddChecklist = this.ShowAddChecklist;
		const Labels = this.Labels;
		const Covers = this.Covers;
		return (
			<div id="popoverRef">
				<Modal
					show={this.state.showModal}
					onHide={this.handleCloseModal}
					scrollable
				>
					<Modal.Header closeButton ref={this.popoverRef}>
						<Modal.Title style={{ width: "100%" }}>
							<p ref={this.coverSyleRef} style={this.coverStyle}></p>
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="row">
							<div className="col-8">
								<p>{this.props.card.value}</p>
								<Info />
							</div>
							<div className="col-4">
								<ShowAddChecklist />
								<Labels />
								<Covers />
							</div>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<button variant="secondary" onClick={this.handleCloseModal}>
							Close
						</button>
						<button variant="primary" onClick={this.handleCloseModal}>
							Save Changes
						</button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

export default EditCard;
