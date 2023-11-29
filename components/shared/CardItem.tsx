import React from 'react';
import { Data } from '../../constants/interfaces';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { formatDateString } from '@/lib/utils';
import { Button } from '../ui/button';

interface Props {
    data: Data;
    handleDragging: () => void;
    handleRemoveTodo: () => void;
  }

export const CardItem = ({
  data,
  handleDragging,
  handleRemoveTodo,
}: Props) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', data._id.toString());
    handleDragging(true);
  };

  const handleDragEnd = () => handleDragging(false);

  return (
    <Sheet>
      <SheetTrigger className="w-full pointer bg-transparent">
        <div
          className="rounded-xl border bg-dark-2 text-light-2 p-2 text-left"
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <p>{data.title}</p>
          <p className="text-x-small-semibold pt-2">{formatDateString(data.createdAt)}</p>
        </div>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle><h3 className='head-text-3'>{data.title}</h3></SheetTitle>
          <SheetDescription>
            <div className="flex justify-between flex-col">
              <div className="w-full py-2 border-color-bg-dark-2 my-2 rounded-xl">{data.desc}</div>
              <p className="text-x-small-semibold">{formatDateString(data.createdAt)}</p>
            </div>
            <Button className="mt-4 w-full" variant="destructive" onClick={() => handleRemoveTodo(data._id)}> Delete </Button>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};