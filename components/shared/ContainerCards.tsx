'use client';

import React, { useState } from 'react';
import { Data, Status } from '../../constants/interfaces';
import { CardItem } from './CardItem';
import { MdAdd } from 'react-icons/md';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import CreateTodo from '../forms/CreateTodo';

interface Props {
  items: Data[];
  status: Status;
  isDragging: boolean;
  userId: string;
  handleDragging: () => void;
  handleUpdateList: () => void;
  handleAddTodo: () => void;
  handleRemoveTodo: () => void;
}

export const ContainerCards = ({
  items = [],
  userId,
  status,
  isDragging,
  handleDragging,
  handleUpdateList,
  handleAddTodo,
  handleRemoveTodo,
}: Props) => {
  const [open, setOpen] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleUpdateList(e.dataTransfer.getData('text'), status);
    handleDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault();

  return (
    <div
      className={`rounded-xl p-5 lg:w-1/3 w-full bg-white  border-gray-400 border border-dashed ${isDragging ? 'border-red-400' : ''
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <p className="text-dark-1 pb-2 pl-2">{status.toUpperCase()}</p>
      {items.map(
        (item) =>
          status === item.status && (
            <CardItem
              data={item}
              key={item._id.toString()}
              handleDragging={handleDragging}
              handleRemoveTodo={handleRemoveTodo}
            />
          )
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="mt-1 w-full">
          <div className="rounded-xl border bg-dark-1 text-light-2 p-2 w-full flex justify-center">
            Add new todo <MdAdd className="ml-2" size="24px" />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Todo</DialogTitle>
            <DialogDescription>
              <CreateTodo userId={userId} setOpen={setOpen} status={status} handleAddTodo={handleAddTodo} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};