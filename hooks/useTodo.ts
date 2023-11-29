import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { fetchUserInfo } from '@/lib/actions/user.actions';
import { Data, Status } from '../constants/interfaces';
import { updateToDoStatus } from '@/lib/actions/todo.actions';
import { createToDo, fetchTodos, deleteToDo } from '@/lib/actions/todo.actions';
import { usePathname } from 'next/navigation';

export const useTodo = (userId: string) => {
  const pathname = usePathname();
  const [isDragging, setIsDragging] = useState(false);
  const [listItems, setListItems] = useState<Data[]>([]);
  const [authorId, setAuthorId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserTodos() {
      try {
        const user = await fetchUserInfo(userId);

        if (user) {
          setAuthorId(user._id);
        }

        if (!user?.onboarded) {
          redirect('/onboarding');
          return;
        }

        const data = await fetchTodos(user.id);
        setListItems(data);
      } catch (error) {
        console.error('Error fetching user todos:', error);
      }
    }

    fetchUserTodos();
  }, [userId, pathname]);

  const handleUpdateList = async (text: string, status: Status) => {
    let card = listItems.find((item) => item._id === text);
    if (card && card.status !== status) {
      card.status = status;

      setListItems((prev) => [
        card!,
        ...prev.filter((item) => item._id !== text),
      ]);

      await updateToDoStatus(card._id, card.status, pathname);
    }
  };


  const handleDragging = (dragging: boolean) => setIsDragging(dragging);

  const handleAddTodo = async ({ title, desc, status }) => {
    try {
      const newTodo = await createToDo({
        title,
        desc,
        status,
        author: authorId,
        path: pathname,
      });

      if (newTodo) {
        const newTodoMapped = {
          _id: newTodo._id,
          title: newTodo.title,
          desc: newTodo.desc,
          status: newTodo.status,
          createdAt: newTodo.createdAt.toString(),
        };

        setListItems((prev) => [...prev, newTodoMapped]);
      }
    } catch (error) {
      console.error('Error adding new todo:', error);
    }
  };

  const handleRemoveTodo = async (todoId: string) => {

    await deleteToDo(
      todoId,
      pathname
    );

    setListItems((prev) => prev.filter((item) => item._id !== todoId));
  };

  return {
    isDragging,
    listItems,
    handleUpdateList,
    handleDragging,
    handleAddTodo,
    handleRemoveTodo,
  };
};
