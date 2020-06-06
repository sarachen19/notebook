import React, { useRef, useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import Checklist from "./checklist";

export const ChecklistSourceBox = ({ k, card, checklist, onCardsChange }) => {
  const ref = useRef(null);
  const item = {
    checklist: (
      <Checklist
        key={k}
        index={k}
        card={card}
        checklist={checklist}
        onCardsChange={onCardsChange}
      />
    ),
    type: ItemTypes.CHECKLIST,
  };
  const [, drop] = useDrop({
    accept: ItemTypes.CHECKLIST,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      //if a checklist is being dragged
      if (item.type === "Checklist") {
        const dragChecklist = item.checklist.props.checklist;
        const dragIndex = item.checklist.props.index;
        const hoverIndex = k;
        const dragCard = item.checklist.props.card;
        const hoverCard = card;
        //drag within same card
        if (hoverCard === dragCard) {
          if (dragIndex === hoverIndex) return;
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
          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
          }
          // Dragging upwards
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
          }
        }
        moveChecklistWithinCard(dragChecklist, dragIndex, dragCard, hoverIndex);
      }
    },
    drop() {
      return item.checklist;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      // if is dropped over another card, add checklist into card
      if (dropResult !== null && dropResult.type.name === "Card") {
        const targetCard = dropResult.props.card;
        const originalCard = item.checklist.props.card;
        const draggingChecklist = item.checklist.props.checklist;
        if (targetCard !== originalCard) {
          moveChecklistAcrossCard(draggingChecklist, originalCard, targetCard);
        }
      }
    },
  });

  //move a checklist into target card
  const moveChecklistAcrossCard = useCallback(
    (draggingChecklist, originalCard, targetCard) => {
      originalCard.checklists = originalCard.checklists.filter(
        (checklist) => checklist !== draggingChecklist
      );
      targetCard.checklists = [...targetCard.checklists, draggingChecklist];
      onCardsChange();
    },
    [onCardsChange]
  );
  //reorder a checklist within a card
  const moveChecklistWithinCard = useCallback(
    (draggingChecklist, dragIndex, card, targetIndex) => {
      card.checklists = card.checklists.filter(
        (checklist) => checklist !== draggingChecklist
      );
      card.checklists.splice(targetIndex, 0, draggingChecklist);
      onCardsChange();
    },
    [onCardsChange]
  );
  const style = {
    width: "100%",
    cursor: isDragging ? "grabbing" : "grab",
  };

  drag(drop(ref));
  return (
    <div ref={ref} style={style}>
      {" "}
      {item.checklist}{" "}
    </div>
  );
};
