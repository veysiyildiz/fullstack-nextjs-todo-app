"use server";

import { connectToDB } from "../mongoose";
import CommentModel, { Comment as CommentType } from "../models/comment.model";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";

interface Comment extends CommentType {
  _id: string;
}

export async function fetchComments(todoId: string): Promise<Comment[]> {
  connectToDB();

  try {
    const todo = await CommentModel.findById(todoId).populate({
      path: "children",
      populate: {
        path: "author",
        model: User,
        select: "_id id name parentId image",
      },
    });

    if (!todo) {
      throw new Error("ToDo not found");
    }

    const comments: Comment[] = todo.children || [];

    return comments;
  } catch (err) {
    console.error("Error while fetching comments:", err);
    throw new Error("Unable to fetch comments");
  }
}

export async function deleteComment(commentId: string, path: string): Promise<void> {
  connectToDB();

  try {
    const comment = await CommentModel.findById(commentId);

    if (!comment) {
      throw new Error("Comment not found");
    }

    // Delete the comment
    await CommentModel.findByIdAndDelete(commentId);

    // Remove the comment ID from the parent ToDo's children array
    const parentToDo = await CommentModel.findById(comment.parentId);
    if (parentToDo) {
      parentToDo.children = parentToDo.children.filter(
        (childId) => childId.toString() !== commentId
      );
      await parentToDo.save();
    }

    revalidatePath(path);
  } catch (err) {
    console.error("Error while deleting comment:", err);
    throw new Error("Unable to delete comment");
  }
}


