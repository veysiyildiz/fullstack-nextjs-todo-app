'use client';

import React from 'react';
import { useTodo } from '../../hooks/useTodo';
import { Status } from '../../interfaces';
import { ContainerCards } from './ContainerCards';

const typesHero: Status[] = ['Todo', 'In Progress', 'Done'];

interface Props {
  userId: string;
}

export const DragAndDrop = ({ userId }: Props) => {
  const {
    isDragging,
    listItems,
    handleUpdateList,
    handleDragging,
    handleAddTodo,
    handleRemoveTodo,
  } = useTodo(userId);

  return (
    <div className="flex gap-4 justify-between my-20 mx-4 flex-col lg:flex-row">
      {typesHero.map((container) => (
        <ContainerCards
          items={listItems}
          status={container}
          key={container}
          userId={userId}
          isDragging={isDragging}
          handleDragging={handleDragging}
          handleUpdateList={handleUpdateList}
          handleAddTodo={handleAddTodo}
          handleRemoveTodo={handleRemoveTodo}
        />
      ))}
    </div>
  );
};
