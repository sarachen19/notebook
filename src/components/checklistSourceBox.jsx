import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import Checklist from "./checklist";

export const ChecklistSourceBox = ({
  k,
  group,
  card,
  checklist,
  onCardsChange,
}) => {
  //const ref = useRef(null);
  const item = {
    checklist: (
      <Checklist
        key={k}
        index={k}
        card={card}
        group={group}
        checklist={checklist}
        onCardsChange={onCardsChange}
      />
    ),
    type: ItemTypes.CHECKLIST,
  };
  const [{ isDragging }, drag] = useDrag({
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      console.log(dropResult);
    },
  });
  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {" "}
      {item.checklist}{" "}
    </div>
  );
};
