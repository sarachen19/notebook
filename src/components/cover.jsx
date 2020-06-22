import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./allGroups.css";
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

class Cover extends Component {
	constructor(props) {
		super(props);
		this.state = { addCover: this.props.addCover || false };
		this.setCoverImage = this.setCoverImage.bind(this);
		this.setCoverColor = this.setCoverColor.bind(this);
	}

	setCoverImage(e) {
		const imageSrc = e.target.alt;
		const card = this.props.card;
		card.cover = imageSrc;
		this.props.onAddCovers();
		this.props.onCardsChange();
	}
	setCoverColor(e) {
		e.preventDefault();
		const color = e.target.style.backgroundColor;
		const card = this.props.card;
		card.cover = color;
		this.props.onAddCovers();
		this.props.onCardsChange();
	}
	render() {
		if (this.state.addCover) {
			return (
				<div className="div-grid-covers">
					<div className="d-flex-column div-grid-covers-images">
						<p>Images</p>
						<div className={"d-flex"}>
							<img
								src={cover_image_1}
								alt="cover_image_1"
								className="cover_images"
								onClick={this.setCoverImage}
							/>
							<img
								src={cover_image_2}
								alt="cover_image_2"
								className="cover_images"
								onClick={this.setCoverImage}
							/>
						</div>
						<div className={"d-flex"}>
							<img
								src={cover_image_3}
								alt="cover_image_3"
								className="cover_images"
								onClick={this.setCoverImage}
							/>
							<img
								src={cover_image_4}
								alt="cover_image_4"
								className="cover_images"
								onClick={this.setCoverImage}
							/>
						</div>
						<div className="d-flex">
							<img
								src={cover_image_5}
								alt="cover_image_5"
								className="cover_images"
								onClick={this.setCoverImage}
							/>
							<img
								src={cover_image_6}
								alt="cover_image_6"
								className="cover_images"
								onClick={this.setCoverImage}
							/>
						</div>
						<div className="d-flex">
							<img
								src={cover_image_7}
								alt="cover_image_7"
								className="cover_images"
								onClick={this.setCoverImage}
							/>
							<img
								src={cover_image_8}
								alt="cover_image_8"
								className="cover_images"
								onClick={this.setCoverImage}
							/>
						</div>
						<div className="d-flex">
							<img
								src={cover_image_9}
								alt="cover_image_9"
								className="cover_images"
								onClick={this.setCoverImage}
							/>
							<img
								src={cover_image_10}
								alt="cover_image_10"
								className="cover_images"
								onClick={this.setCoverImage}
							/>
						</div>
					</div>
					<div className="d-flex-column div-grid-covers-colors">
						<p>Colors</p>
						<div className={"d-flex justify-content-between"}>
							<button
								className="btn cover_colors"
								style={{ backgroundColor: "#FF6F61" }}
								onClick={this.setCoverColor}
							></button>
							<button
								className="btn cover_colors"
								style={{ backgroundColor: "#6B5B95" }}
								onClick={this.setCoverColor}
							></button>
							<button
								className="btn cover_colors"
								style={{ backgroundColor: "#F7CAC9" }}
								onClick={this.setCoverColor}
							></button>
							<button
								className="btn cover_colors"
								style={{ backgroundColor: "#EFC050" }}
								onClick={this.setCoverColor}
							></button>
						</div>
						<div className={"d-flex justify-content-between"}>
							<button
								className="btn cover_colors"
								style={{ backgroundColor: "#935529" }}
								onClick={this.setCoverColor}
							></button>
							<button
								className="btn cover_colors"
								style={{ backgroundColor: "#F5D6C6" }}
								onClick={this.setCoverColor}
							></button>
							<button
								className="btn cover_colors"
								style={{ backgroundColor: "#577284" }}
								onClick={this.setCoverColor}
							></button>
							<button
								className="btn cover_colors"
								style={{ backgroundColor: "#EAE6DA" }}
								onClick={this.setCoverColor}
							></button>
						</div>
					</div>
				</div>
			);
		}
		return null;
	}
}

export default Cover;
