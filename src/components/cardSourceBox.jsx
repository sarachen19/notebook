import React, { useState, useCallback, useMemo } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import Card from "./card";

export const CardSourceBox = ({ k, index, card, group, onCardsChange }) => {
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

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {item.card}
    </div>
  );
};
