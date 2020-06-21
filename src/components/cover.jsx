import React, { Component } from "react";
import firebase from "./firebaseApp";
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

const storage = firebase.storage();
const storageRef = storage.ref();

class Cover extends Component {
	constructor(props) {
		super(props);
		this.state = { addCover: this.props.addCover || false };
		this.setCoverImage = this.setCoverImage.bind(this);
	}

	getCoverImage(path) {
		//console.log(storageRef.child(path).fullPath);
		//return storageRef.child(path).fullPath;
		storageRef
			.child(path + ".png")
			.getDownloadURL()
			.then(function (url) {
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function () {
					if (this.readyState == 4 && this.status == 200) {
						console.log(url);
						//console.log(e.currentTarget);
						//document.getElementById("cover_image_1").src = url;
						return url;
					}
				};
				xhttp.open("GET", url, true);
				xhttp.send();
			})
			.catch(function (error) {
				console.log("error");
			});

		/*
		storageRef
			.child(path)
			.getDownloadURL()
			.then(function (url) {
				var xhr = new XMLHttpRequest();
				xhr.responseType = "blob";
				xhr.onload = function (event) {
					var blob = xhr.response;
				};
				xhr.open("GET", url);
				xhr.send();
				// Or inserted into an <img> element:
				console.log(url);
				return url;
			})
			.catch(function (error) {
				console.log("downloading error");
			});
			*/
	}
	setCoverImage(e) {
		const imageSrc = e.target.alt;
		const card = this.props.card;
		card.cover = imageSrc;
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
							></button>
							<button
								className="btn cover_colors"
								style={{ backgroundColor: "#6B5B95" }}
							></button>
							<button
								className="btn cover_colors"
								style={{ backgroundColor: "#F7CAC9" }}
							></button>
							<button
								className="btn cover_colors"
								style={{ backgroundColor: "#EFC050" }}
							></button>
						</div>
						<div className={"d-flex justify-content-between"}>
							<button
								className="btn cover_colors"
								style={{ backgroundColor: "#935529" }}
							></button>
							<button
								className="btn cover_colors"
								style={{ backgroundColor: "#F5D6C6" }}
							></button>
							<button
								className="btn cover_colors"
								style={{ backgroundColor: "#577284" }}
							></button>
							<button
								className="btn cover_colors"
								style={{ backgroundColor: "#EAE6DA" }}
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
