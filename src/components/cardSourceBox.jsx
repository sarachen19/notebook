import React, { useRef, useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
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
          moveCardWithinGroup(dragGroup, dragCard.card, hoverIndex);
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
      const dragGroup = item.card.props.group;
      const hoverGroup = monitor.getDropResult().props.group;
      if (dragGroup !== hoverGroup) {
        const dragCard = item.card.props;
        const hoverIndex = index;
        moveCardAcrossGroup(dragGroup, dragCard.card, hoverGroup, hoverIndex);
      }
    },
  });
  const moveCardWithinGroup = useCallback(
    (dragGroup, dragCard, hoverIndex) => {
      dragGroup.cards = dragGroup.cards.filter((card) => card !== dragCard);
      dragGroup.cards.splice(hoverIndex, 0, dragCard);
      onCardsChange();
    },
    [group]
  );
  const moveCardAcrossGroup = useCallback(
    (dragGroup, dragCard, hoverGroup, hoverIndex) => {
      dragGroup.cards = dragGroup.cards.filter((card) => card !== dragCard);
      hoverGroup.cards.splice(hoverIndex, 0, dragCard);
      onCardsChange();
    },
    []
  );
  drag(drop(ref));
  const style = {
    border: "1px dashed gray",
    padding: "0.5rem 1rem",
    marginBottom: ".5rem",
    backgroundColor: "beige",
    cursor: "move",
  };
  const opacity = isDragging ? 0 : 1;
  return (
    <div ref={ref} style={{ style, opacity }}>
      {item.card}
    </div>
  );
};
