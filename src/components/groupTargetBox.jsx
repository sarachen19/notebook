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
  const [{ target, isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect: (monitor) => ({
      connectDropTarget: monitor.getDropResult(),
    }),
    drop() {
      return item.group;
    },
  });

  return <div ref={drop}>{item.group}</div>;
};
