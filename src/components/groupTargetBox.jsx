import React from "react";
import { useRef } from "react";
import { useDrop, useDrag, DragPreviewImage } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import Group from "./group";
import { groupImage } from "./groupImage";

export const GroupTargetBox = ({
  k,
  group,
  allGroups,
  onCardsChange,
  onGroupExchange,
}) => {
  const ref = useRef(null);

  const item = {
    group: (
      <Group
        key={k}
        group={group}
        allGroups={allGroups}
        onCardsChange={onCardsChange}
        onGroupExchange={onGroupExchange}
      />
    ),
    type: ItemTypes.GROUP,
  };

  const [{ isDragging }, drag, preview] = useDrag({
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
        return undefined;
      } else {
        //if a card or a  group is dropped on a group
        return item.group;
      }
    },
  });

  const style = {
    backgroundColor: "#82b74b",
    width: "272px",
    height: "100%",
    clear: "both",
  };
  const contentStyle = {
    backgroundColor: "#ebecf0",
    borderRadius: "3px",
    boxSizing: "border-box",
    maxHeight: "100%",
    position: "relative",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    WebkitBoxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    MozBoxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    margin: "0 4px",
    padding: "2%",
    cursor: isDragging ? "none" : "default",
  };

  const previewImgStyle = {
    opacity: isDragging ? 1 : 0,
  };
  drop(drag(ref));
  return (
    <div style={style}>
      <DragPreviewImage
        connect={preview}
        src={groupImage}
        style={previewImgStyle}
      />
      <div ref={ref} style={contentStyle}>
        {item.group}
      </div>
    </div>
  );
};
