import React, { useRef, useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "./card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEraser,
  faTrash,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";

export const CardSourceBox = ({ k, index, card, group, onCardsChange }) => {
  const ref = useRef(null);
  const iconRef = React.createRef();
  const overlayRef = React.createRef();

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
      console.log(monitor.getDropResult());
      if (
        
        monitor.getDropResult().type.name === "Card" ||
        monitor.getDropResult().type.name === "Group"
      ) {
        //if dropped on a card
        const dragGroup = item.card.props.group;
        const hoverGroup = monitor.getDropResult().props.group;
        console.log(hoverGroup);
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
  const showEditPane = (e) => {
    iconRef.current.style.visibility = "visible";
    iconRef.current.style.position = "absolute";
    iconRef.current.style.zIndex = 99;
    iconRef.current.style.left = "100px";
    overlayRef.current.style.visibility = "visible";
  };
  const hideEditPane = (e) => {
    iconRef.current.style.visibility = "hidden";
    overlayRef.current.style.visibility = "hidden";
  };
  const deleteCard = () => {
    const tempCard = card;
    group.cards = group.cards.filter((card) => card !== tempCard);
    hideEditPane();
    onCardsChange();
  };

  const style = {
    width: "100%",
    padding: "0.5rem 1rem",
    marginBottom: ".5rem",
    backgroundColor: "white",
    borderRadius: "18px 3px 3px 3px",
    WebkitBoxShadow: "0px 2px 2px 0px rgba(179,175,179,1)",
    MozBoxShadow: "0px 2px 2px 0px rgba(179,175,179,1)",
    boxShadow: "0px 2px 2px 0px rgba(179,175,179,1)",
    cursor: isDragging ? "grabbing" : "grab",
  };
  const editPaneStyle = {
    visibility: "hidden",
    position: "absolute",
    width: "200px",
    backgroundColor: "white",
    padding: "20px",
  };
  const overlayStyle = {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: " rgba(0,0,0,.8)",
    zIndex: 98,
    visibility: "hidden",
  };

  return (
    <>
      <div
        ref={ref}
        style={style}
        onMouseEnter={enter}
        onMouseLeave={leave}
        className="d-flex justify-content-between"
      >
        {item.card}
        <FontAwesomeIcon icon={faEdit} onClick={showEditPane} />
      </div>
      <div style={overlayStyle} ref={overlayRef}></div>
      <div style={editPaneStyle} ref={iconRef}>
        <div className="d-flex justify-content-between">
          <p>Edit labels</p>
          <FontAwesomeIcon icon={faEraser} />
        </div>
        <div className="d-flex justify-content-between" onClick={deleteCard}>
          <p>Delete</p>
          <FontAwesomeIcon icon={faTrash} />
        </div>
        <div className="d-flex justify-content-between" onClick={hideEditPane}>
          <p>Exit</p>
          <FontAwesomeIcon icon={faWindowClose} />
        </div>
      </div>
    </>
  );
};
