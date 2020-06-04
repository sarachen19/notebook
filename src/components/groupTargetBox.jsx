import React, { useState, useCallback, useMemo } from "react";
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
  const [{ isOverCurrent, isOver, isHoverTarget }, drop] = useDrop({
    accept: [],

    collect: (monitor) => ({
      isHoverTarget: monitor.isOver(),
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
    hover(item, monitor) {
      //console.log(isOver);
      //console.log(isOverCurrent);
    },
    drop() {
      return item.group;
    },
  });

  return <div ref={drop}>{item.group}</div>;
};
