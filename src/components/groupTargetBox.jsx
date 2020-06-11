import React from "react";
import {useRef} from 'react';
import { useDrop, useDrag} from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import Group from "./group";

export const GroupTargetBox = ({ k, group, allGroups, onCardsChange }) => {
  const ref = useRef(null);

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
  const [{ isDragging }, drag] = useDrag({
    item,
    collect: (monitor) => ({
      
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      console.log(item);
      console.log(monitor.getDropResult());
    }
  })
  const [{ isOverCurrent }, drop] = useDrop({
    accept: [ItemTypes.CARD, ItemTypes.GROUP],

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
        //drop to be handled by group
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
  drop(drag(ref));
  return (
    <div ref={ref} style={style}>
      <div style={contentStyle}>{item.group}</div>
    </div>
  );
};
