import React, { useRef } from "react";
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
    accept: ItemTypes.CHECKLIST,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      //console.log(hoverIndex);
    },
    drop() {
      return item.card;
    },
  });

  const [{ isDragging, monitorDidDrop }, drag] = useDrag({
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      monitorDidDrop: monitor.didDrop(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      let draggingCard = item.card.props.card;
      if (dropResult === null) {
        return;
      }
      let fromGroup = item.card.props.group;
      let toGroup = dropResult.props.group;
      if (fromGroup.key != toGroup.key) {
        toGroup.cards = [...toGroup.cards, draggingCard];
        fromGroup.cards = fromGroup.cards.filter(
          (card) => card !== draggingCard
        );
      }
      onCardsChange();
    },
  });
  drag(drop(ref));
  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {item.card}
    </div>
  );
};
