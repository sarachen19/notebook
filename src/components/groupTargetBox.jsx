import React from "react";
import { useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import Group from "./group";
import PropTypes from "prop-types";

export const GroupTargetBox = ({
	k,
	group,
	allGroups,
	onCardsChange,
	onGroupExchange,
}) => {
	const ref = useRef(null);
	const g = (
		<Group
			key={k}
			group={group}
			allGroups={allGroups}
			onCardsChange={onCardsChange}
			onGroupExchange={onGroupExchange}
		/>
	);
	const item = {
		group: g,
		type: ItemTypes.GROUP,
	};

	const [{ isDragging }, drag] = useDrag({
		item,
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
		end: (item, monitor) => {
			if (monitor.getDropResult() != null) {
				const group1 = item.group.props.group;
				const group2 = monitor.getDropResult().props.group;
				onGroupExchange(group1, group2);
			}
		},
	});
	const [{ isOverCurrent }, drop] = useDrop({
		accept: [ItemTypes.CARD, ItemTypes.GROUP],

		collect: (monitor) => ({
			isOverCurrent: monitor.isOver({ shallow: true }),
		}),

		drop() {
			if (isOverCurrent === false) {
				//if a card is dropped on a card
				//console.log(isOverCurrent);
				return undefined;
			} else {
				//if a card or a  group is dropped on a group
				//console.log(item.group);
				return item.group;
			}
		},
	});

	const style = {
		width: "272px",
		height: "100%",
		clear: "both",
		margin: "0 4px",
	};
	const contentStyle = {
		padding: "8px",
		backgroundColor: "#ebecf0",
		borderRadius: "3px",
		boxSizing: "border-box",
		maxHeight: "100%",
		position: "relative",
		cursor: isDragging ? "grabbing" : "pointer",
	};

	drop(drag(ref));
	return (
		<div style={style}>
			<div ref={ref} style={contentStyle}>
				{item.group}
			</div>
		</div>
	);
};
GroupTargetBox.propTypes = {
	group: PropTypes.object,
	g: PropTypes.instanceOf(Group),
};
