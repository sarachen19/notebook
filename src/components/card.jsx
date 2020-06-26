import React, { Component } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAlignLeft,
	faEdit,
	faEraser,
	faTrash,
	faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import EditCard from "./editCard";
import { ChecklistSourceBox } from "./checklistSourceBox";
import Label from "./label";
import Validators from "./validators";
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
const style = {
	width: "100%",
};
const overlayStyle = {
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
	backgroundColor: " rgba(0,0,0,.8)",
	zIndex: 98,
	visibility: "hidden",
};
const editPaneStyle = {
	visibility: "hidden",
	position: "absolute",
	width: "200px",
	backgroundColor: "white",
	padding: "20px",
};
class Card extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentCard: "", //card to be edited
			edit: false, // true to show modal, false to hide
			newCard: {
				value: "",
				checklists: [],
				labels: [],
				dueDate: "",
				description: "",
				comments: [],
				cover: "",
				attachment: "",
				groupKey: this.props.group.key,
			},
			add: false || this.props.add,
			showAddButton: false,
		};
		this.popupEdit = this.popupEdit.bind(this);
		this.handleEditUpdate = this.handleEditUpdate.bind(this);
		this.handleAddSubmit = this.handleAddSubmit.bind(this);
		this.handleAddChange = this.handleAddChange.bind(this);

		this.coverRef = React.createRef();
		this.displayCover = this.displayCover.bind(this);

		this.EditPane = this.EditPane.bind(this);
		this.iconRef = React.createRef();
		this.overlayRef = React.createRef();
		this.showEditPane = this.showEditPane.bind(this);
		this.deleteCard = this.deleteCard.bind(this);
		this.hideEditPane = this.hideEditPane.bind(this);
	}
	/*
	 *--------------------------onhover show option icons--------------------------------
	 */
	showOptionIcons(e, type) {
		const children = e.currentTarget.children;
		Array.from(children)
			.slice(1, children.length)
			.forEach((child) => {
				child.style.visibility = type;
			});
	}
	/*
	 *--------------------------edit card ( show modal )--------------------------------
	 */
	popupEdit(card) {
		this.setState({ edit: true, currentCard: card });
	}

	handleEditUpdate() {
		this.setState({ edit: false, currentCard: "" });
	}

	handleAddChange(event) {
		//update newCard
		if (Validators.isEmpty(event.target.value) === false) {
			this.setState({
				newCard: {
					value: event.target.value,
					checklists: [],
					labels: [],
					dueDate: "",
					description: "",
					comments: [],
					cover: "",
					attachment: "",
					groupKey: this.props.group.key,
				},
				showAddButton: true,
			});
		}
	}
	handleAddSubmit(event) {
		//add newCard into cards and update cards in Group
		event.preventDefault();
		if (Validators.isEmpty(event.target.firstElementChild.value) === false) {
			this.props.group.cards.push(this.state.newCard);
			this.setState({
				newCard: {
					value: "",
					checklists: [],
					labels: [],
					dueDate: "",
					description: "",
					comments: [],
					cover: "",
					attachment: "",
					groupKey: "",
				},
				showAddButton: false,
			});
			this.props.onCardsChange();
		}
	}

	/*
	 *--------------------------show cover--------------------------------
	 */
	coverStyle = {
		width: "100%",
		height: "10rem",
		margin: 0,
		padding: 0,
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center center",
		backgroundSize: "cover",
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
		}
	}

	/*
	 *--------------------------edit pane--------------------------------
	 */
	showEditPane = (e) => {
		e.stopPropagation();
		this.iconRef.current.style.visibility = "visible";
		this.iconRef.current.style.position = "absolute";
		this.iconRef.current.style.zIndex = 99;
		this.iconRef.current.style.left = "100px";
		this.overlayRef.current.style.position = "fixed";
		this.overlayRef.current.style.visibility = "visible";
	};
	hideEditPane = (e) => {
		this.iconRef.current.style.visibility = "hidden";
		this.overlayRef.current.style.position = "";
		this.overlayRef.current.style.visibility = "hidden";
	};
	deleteCard = () => {
		const tempCard = this.props.card;
		this.props.group.cards = this.props.group.cards.filter(
			(card) => card !== tempCard
		);
		this.hideEditPane();
		this.props.onCardsChange();
	};
	EditPane = () => {
		return (
			<>
				<div style={overlayStyle} ref={this.overlayRef}></div>
				<div style={editPaneStyle} ref={this.iconRef}>
					<div className="d-flex justify-content-between">
						<p>Edit labels</p>
						<FontAwesomeIcon icon={faEraser} />
					</div>
					<div
						className="d-flex justify-content-between"
						onClick={this.deleteCard}
					>
						<p>Delete</p>
						<FontAwesomeIcon icon={faTrash} />
					</div>
					<div
						className="d-flex justify-content-between"
						onClick={this.hideEditPane}
					>
						<p>Exit</p>
						<FontAwesomeIcon icon={faWindowClose} />
					</div>
				</div>
			</>
		);
	};
	componentDidMount() {
		this.displayCover(this.coverRef);
	}
	componentDidUpdate() {
		this.displayCover(this.coverRef);
	}
	render() {
		const EditPane = this.EditPane;
		if (this.state.add) {
			return (
				<OutsideClickHandler
					onOutsideClick={() => {
						this.setState({
							showAddButton: false,
						});
					}}
				>
					{!this.state.showAddButton && (
						<p
							className="addcardtxt"
							onClick={() => {
								this.setState({
									showAddButton: true,
								});
							}}
						>
							&#43; Add another card
						</p>
					)}
					{this.state.showAddButton && (
						<form onSubmit={this.handleAddSubmit}>
							<input
								type="text"
								placeholder="Enter card name"
								onChange={this.handleAddChange}
								defaultValue=""
							></input>
							<br />
							<button type="submit" className="btn btn-success btn-sm">
								Add
							</button>
						</form>
					)}
				</OutsideClickHandler>
			);
		} else if (!this.state.add) {
			return (
				<>
					<div style={style} onClick={() => this.popupEdit(this.props.card)}>
						<p ref={this.coverRef} style={this.coverStyle}></p>
						<Label smallLabel={true} card={this.props.card} />
						<div
							className="d-flex"
							onMouseOver={(e) => this.showOptionIcons(e, "visible")}
							onMouseOut={(e) => this.showOptionIcons(e, "hidden")}
						>
							<p className="card-cardname">{this.props.card.value}</p>
							<span
								className="card-icons-hide"
								data-toggle="tooltip"
								data-html="true"
								title={this.props.card.description}
							>
								<FontAwesomeIcon icon={faAlignLeft} />
							</span>
							<span className="card-icons-hide">
								<FontAwesomeIcon icon={faEdit} onClick={this.showEditPane} />
							</span>
						</div>

						{this.props.card.checklists.map((checklist, index) => {
							return (
								<ChecklistSourceBox
									key={index}
									k={index}
									card={this.props.card}
									checklist={checklist}
									onCardsChange={this.props.onCardsChange}
								/>
							);
						})}
					</div>
					{this.state.edit && (
						<EditCard
							edit={this.handleEditUpdate}
							card={this.state.currentCard}
							group={this.props.group}
							onCardsChange={this.props.onCardsChange}
						/>
					)}
					<EditPane />
				</>
			);
		}
	}
}

export default Card;
