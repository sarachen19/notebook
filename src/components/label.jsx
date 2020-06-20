import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

class Label extends Component {
	constructor(props) {
		super(props);
		this.state = {
			addLabel: this.props.addLabel || false,
			smallLabel: this.props.smallLabel || false,
		};
		this.editLabel = this.editLabel.bind(this);
		this.SelectedLabels = this.SelectedLabels.bind(this);
		this.primary = React.createRef();
		this.success = React.createRef();
		this.info = React.createRef();
		this.warning = React.createRef();
		this.danger = React.createRef();
		this.secondary = React.createRef();
		this.dark = React.createRef();
	}

	SelectedLabels() {
		const labels = this.props.card.labels;
		const labelStyle = {
			height: this.state.smallLabel ? "1em" : "2em",
			width: "50px",
			margin: "0 1px",
		};
		return (
			<div>
				{labels.map((label, index) => {
					const className = "btn btn-xs disabled " + label;
					return (
						<p key={index} className={className} style={labelStyle}>
							{" "}
						</p>
					);
				})}
			</div>
		);
	}
	editLabel(e) {
		e.preventDefault();
		let label = e.target;
		if (label.innerHTML[0] === "<") {
			label = label.parentElement.parentElement;
		} else if (label.innerHTML[0] === undefined) {
			label = label.parentElement.parentElement.parentElement;
		}
		const bgColor = label.className.split(" ")[3];
		const labels = new Set(this.props.card.labels);
		if (labels.has(bgColor)) {
			labels.delete(bgColor);
			label.firstElementChild.style.display = "none";
		} else if (!labels.has(bgColor)) {
			labels.add(bgColor);
			label.firstElementChild.style.display = "inline-block";
		}
		this.props.card.labels = Array.from(labels);
		this.props.onCardsChange();
	}
	componentDidMount() {
		if (this.state.addLabel) {
			const labels = new Set(this.props.card.labels);
			const refs = [
				this.primary,
				this.success,
				this.info,
				this.warning,
				this.danger,
				this.secondary,
				this.dark,
			];
			refs.forEach((ref) => {
				const tempClassName = ref.current.parentElement.className;
				const bgColor = tempClassName.split(" ")[3];
				if (labels.has(bgColor)) {
					ref.current.style.display = "inline-block";
				} else {
					ref.current.style.display = "none";
				}
			});
		}
	}

	render() {
		if (this.state.addLabel)
			return (
				<>
					<div
						className="d-flex btn btn-block bg-primary"
						onClick={this.editLabel}
					>
						color
						<span ref={this.primary}>
							{" "}
							<FontAwesomeIcon icon={faCheck} />
						</span>
					</div>
					<div
						className="d-flex btn btn-block bg-success"
						onClick={this.editLabel}
					>
						color
						<span ref={this.success}>
							{" "}
							<FontAwesomeIcon icon={faCheck} />
						</span>
					</div>
					<div
						className="d-flex btn btn-block bg-info"
						onClick={this.editLabel}
					>
						color
						<span ref={this.info}>
							{" "}
							<FontAwesomeIcon icon={faCheck} />
						</span>
					</div>
					<div
						className="d-flex btn btn-block bg-warning"
						onClick={this.editLabel}
					>
						color
						<span ref={this.warning}>
							<FontAwesomeIcon icon={faCheck} />
						</span>
					</div>
					<div
						className="d-flex btn btn-block bg-danger"
						onClick={this.editLabel}
					>
						color
						<span ref={this.danger}>
							<FontAwesomeIcon icon={faCheck} />
						</span>
					</div>
					<div
						className="d-flex btn btn-block bg-secondary"
						onClick={this.editLabel}
					>
						color
						<span ref={this.secondary}>
							<FontAwesomeIcon icon={faCheck} />
						</span>
					</div>
					<div
						className="d-flex btn btn-block bg-dark"
						onClick={this.editLabel}
					>
						color
						<span ref={this.dark}>
							<FontAwesomeIcon icon={faCheck} />
						</span>
					</div>
				</>
			);
		else {
			const SelectedLabels = this.SelectedLabels;
			return <SelectedLabels />;
		}
	}
}

export default Label;
