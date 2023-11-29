'use server';

import { revalidatePath } from 'next/cache';
import { connectToDB } from '../mongoose';

import User from '../models/user.model';
import ToDo from '../models/todo.model';
import { stat } from 'fs';

export async function fetchTodos(userId: string) {
  try {
    connectToDB();

    const user = await User.findOne({ id: userId });

    if (!user) {
      throw new Error('User not found');
    }

    const todos = await ToDo.find({ author: user._id });

    const todosStringified = todos.map((todo) => ({
      _id: todo._id.toString(),
      title: todo.title,
      desc: todo.desc,
      status: todo.status,
      createdAt: todo.createdAt.toString(),
    }));

    return todosStringified;
  } catch (error) {
    console.error('Error fetching user todos:', error);
    throw error;
  }
}

interface Params {
  title: string,
  desc: string,
  author: string,
  status: string,
  path: string,
}

export async function createToDo({ title, desc, status, author, path }: Params) {
  try {
    connectToDB();
    const createdToDo = await ToDo.create({
      title,
      desc,
      status,
      author,
    });

    await User.findByIdAndUpdate(author, {
      $push: { todos: createdToDo._id },
    });

    return createdToDo;
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create todo: ${error.message}`);
  }
}

export async function deleteToDo(id: string, path: string): Promise<void> {
  try {
    connectToDB();

    const todo = await ToDo.findById(id);

    if (!todo) {
      throw new Error('ToDo not found');
    }

    await User.findByIdAndUpdate(todo.author, {
      $pull: { todos: todo._id },
    });

    await ToDo.deleteOne({ _id: id });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to delete ToDo: ${error.message}`);
  }
}

export async function updateToDoStatus(
  todoId: string,
  status: string,
  path: string
) {
  connectToDB();

  try {
    const todo = await ToDo.findById(todoId);

    if (!todo) {
      throw new Error('ToDo not found');
    }

    todo.status = status;

    await todo.save();

    revalidatePath(path);
  } catch (err) {
    console.error('Error while updating ToDo status:', err);
    throw new Error('Unable to update ToDo status');
  }
}