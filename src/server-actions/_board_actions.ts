"use server";

import { Priority, Status } from "@/lib/constant";
import prisma from "@/lib/prisma";

interface CommentWithUser {
  id: number;
  text: string;
  taskId: number;
  userId: number;
  user: {
    userId: number;
    username: string;
    email: string;
    profilePictureUrl?: string;
    cognitoId: string;
    teamId?: number;
  };
}

export async function getProjectTasks(projectId: number): Promise<any> {
  try {
    const tasks = await prisma.task.findMany({
      where: { projectId },
      include: {
        author: true,
        assignee: true,
        comments: {
          include: {
            user: true,
          },
        },
        attachments: true,
      },
    });

    return tasks.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description || undefined,
      status: (task.status as Status) || undefined,
      priority: (task.priority as Priority) || undefined,
      tags: task.tags || undefined,
      startDate: task.startDate?.toISOString() || undefined,
      dueDate: task.dueDate?.toISOString() || undefined,
      points: task.points || undefined,
      projectId: task.projectId,
      authorUserId: task.authorUserId,
      assignedUserId: task.assignedUserId || undefined,
      author: {
        userId: task.author.userId,
        username: task.author.username,
        profilePictureUrl: task.author.profilePictureUrl || undefined,
        cognitoId: task.author.cognitoId,
        teamId: task.author.teamId || undefined,
        email: "",
      },
      assignee: task.assignee
        ? {
            userId: task.assignee.userId,
            username: task.assignee.username,
            profilePictureUrl: task.assignee.profilePictureUrl || undefined,
            cognitoId: task.assignee.cognitoId,
            teamId: task.assignee.teamId || undefined,
            email: "",
          }
        : undefined,
      comments: task.comments.map(
        (comment): CommentWithUser => ({
          id: comment.id,
          text: comment.text,
          taskId: comment.taskId,
          userId: comment.userId,
          user: {
            userId: comment.user.userId,
            username: comment.user.username,
            email: "",
            profilePictureUrl: comment.user.profilePictureUrl || undefined,
            cognitoId: comment.user.cognitoId,
            teamId: comment.user.teamId || undefined,
          },
        }),
      ),
      attachments: task.attachments,
    }));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks");
  }
}

export async function updateTaskStatus(
  taskId: number,
  status: string,
): Promise<any> {
  try {
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { status },
      include: {
        author: true,
        assignee: true,
        comments: {
          include: {
            user: true,
          },
        },
        attachments: true,
      },
    });

    return {
      id: updatedTask.id,
      title: updatedTask.title,
      description: updatedTask.description || undefined,
      status: (updatedTask.status as Status) || undefined,
      priority: (updatedTask.priority as Priority) || undefined,
      tags: updatedTask.tags || undefined,
      startDate: updatedTask.startDate?.toISOString() || undefined,
      dueDate: updatedTask.dueDate?.toISOString() || undefined,
      points: updatedTask.points || undefined,
      projectId: updatedTask.projectId,
      authorUserId: updatedTask.authorUserId,
      assignedUserId: updatedTask.assignedUserId || undefined,
      author: {
        userId: updatedTask.author.userId,
        username: updatedTask.author.username,
        profilePictureUrl: updatedTask.author.profilePictureUrl || undefined,
        cognitoId: updatedTask.author.cognitoId,
        teamId: updatedTask.author.teamId || undefined,
        email: "",
      },
      assignee: updatedTask.assignee
        ? {
            userId: updatedTask.assignee.userId,
            username: updatedTask.assignee.username,
            profilePictureUrl:
              updatedTask.assignee.profilePictureUrl || undefined,
            cognitoId: updatedTask.assignee.cognitoId,
            teamId: updatedTask.assignee.teamId || undefined,
            email: "",
          }
        : undefined,
      comments: updatedTask.comments.map(
        (comment): CommentWithUser => ({
          id: comment.id,
          text: comment.text,
          taskId: comment.taskId,
          userId: comment.userId,
          user: {
            userId: comment.user.userId,
            username: comment.user.username,
            email: "",
            profilePictureUrl: comment.user.profilePictureUrl || undefined,
            cognitoId: comment.user.cognitoId,
            teamId: comment.user.teamId || undefined,
          },
        }),
      ),
      attachments: updatedTask.attachments,
    };
  } catch (error) {
    console.error("Error updating task status:", error);
    throw new Error("Failed to update task status");
  }
}
