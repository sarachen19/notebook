import React, { useRef, useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./allGroups.css";
import Card from "./card";

export const CardSourceBox = ({ k, index, card, group, onCardsChange }) => {
	const ref = useRef(null);

	const item = {
		card: (
			<Card
				key={k}
				index={index}
				card={card}
				group={group}
				onCardsChange={onCardsChange}
			/>
		),
		type: ItemTypes.CARD,
	};

	const [, drop] = useDrop({
		accept: [ItemTypes.CARD, ItemTypes.CHECKLIST],
		//drag within same group
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}
			//if a card is being dragged
			if (item.type === "Card") {
				const dragGroup = item.card.props.group;
				const hoverGroup = group;
				const dragCard = item.card.props;
				const hoverIndex = index;
				//drag within same group
				if (dragGroup === hoverGroup) {
					if (dragCard.index === hoverIndex) {
						return;
					}
					// Determine rectangle on screen
					const hoverBoundingRect = ref.current?.getBoundingClientRect();
					// Get vertical middle
					const hoverMiddleY =
						(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
					// Determine mouse position
					const clientOffset = monitor.getClientOffset();
					// Get mouse pixels to the top
					const hoverClientY = clientOffset.y - hoverBoundingRect.top;
					// Dragging downwards
					if (
						dragGroup.key === hoverGroup.key &&
						dragCard.index < hoverIndex &&
						hoverClientY < hoverMiddleY
					) {
						return;
					}
					// Dragging upwards
					if (
						dragGroup.key === hoverGroup.key &&
						dragCard.index > hoverIndex &&
						hoverClientY > hoverMiddleY
					) {
						return;
					}

					moveCardWithinGroup(
						dragCard.card,
						dragCard.card.index,
						card,
						hoverIndex
					);
				}
			}
		},
		drop(i, monitor) {
			// if a checklist is dropped over a checklist
			if (monitor.isOver({ shallow: true }) === false) {
				return undefined;
			}
			// if a checklist or a card is dropped over a card
			else {
				return item.card;
			}
		},
	});

	const [{ isDragging }, drag] = useDrag({
		item,
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
		end: (item, monitor) => {
			if (!ref.current || monitor.getDropResult() === null) {
				return;
			}
			//drag across group
			if (
				monitor.getDropResult().type.name === "Card" ||
				monitor.getDropResult().type.name === "Group" ||
				monitor.getDropResult().type.name === "A"
			) {
				//if dropped on a card
				const dragGroup = item.card.props.group;
				const hoverGroup = monitor.getDropResult().props.group;
				if (dragGroup !== hoverGroup) {
					const dragCard = item.card.props;
					const hoverIndex = index;
					moveCardAcrossGroup(dragGroup, dragCard.card, hoverGroup, hoverIndex);
				}
			}
		},
	});

	const moveCardWithinGroup = useCallback(
		(dragCard, dragIndex, hoverCard, hoverIndex) => {
			group.cards = group.cards.filter((card) => card !== dragCard);
			group.cards.splice(hoverIndex, 0, dragCard);
			onCardsChange();
		},
		[onCardsChange, group.cards]
	);
	const moveCardAcrossGroup = useCallback(
		(dragGroup, dragCard, hoverGroup, hoverIndex) => {
			dragGroup.cards = dragGroup.cards.filter((card) => card !== dragCard);
			hoverGroup.cards.splice(hoverIndex, 0, dragCard);
			onCardsChange();
		},
		[onCardsChange]
	);
	drag(drop(ref));

	const enter = (e) => {
		e.currentTarget.style.backgroundColor = "#ebecf0";
	};
	const leave = (e) => {
		e.currentTarget.style.backgroundColor = "white";
	};

	const style = {
		width: "100%",
		marginBottom: ".5rem",
		backgroundColor: "white",
		borderRadius: "3px",
		WebkitBoxShadow: "0px 2px 2px 0px rgba(179,175,179,1)",
		MozBoxShadow: "0px 2px 2px 0px rgba(179,175,179,1)",
		boxShadow: "0px 2px 2px 0px rgba(179,175,179,1)",
		cursor: isDragging ? "grabbing" : "pointer",
	};

	return (
		<div
			ref={ref}
			style={style}
			onMouseEnter={enter}
			onMouseLeave={leave}
			onDragStart={leave}
			onClick={leave}
			className="d-flex justify-content-between card-in-group"
		>
			{item.card}
		</div>
	);
};
