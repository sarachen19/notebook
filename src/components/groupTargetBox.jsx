import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import Group from "./group";

export const GroupTargetBox = ({ k, group, allGroups, onCardsChange }) => {
  const item = {
    group: (
      <Group
        key={k}
        group={group}
        allGroups={allGroups}
        onCardsChange={onCardsChange}
      />
    ),
    type: ItemTypes.GROUP,
  };
  const [{ isOverCurrent }, drop] = useDrop({
    accept: [ItemTypes.CARD],

    collect: (monitor) => ({
      isHoverTarget: monitor.isOver(),
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),

    drop() {
      if (isOverCurrent === false) {
        //if drop handled by card
        return undefined;
      } else {
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
  };
  return (
    <div ref={drop} style={style}>
      <div style={contentStyle}>{item.group}</div>
    </div>
  );
};
