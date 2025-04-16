"use server";

import { Status } from "@/lib/constant";
import prisma from "@/lib/prisma";
import { Priority, Task } from "@/state/api";

export async function getTasksByUserAndPriority(
  userId: number,
  priority: Priority,
): Promise<Task[]> {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        authorUserId: userId,
        priority: priority.toString(), // Convert enum to string for exact matching
      },
      include: {
        author: {
          select: {
            userId: true,
            username: true,
            profilePictureUrl: true,
            cognitoId: true,
            teamId: true,
          },
        },
        assignee: {
          select: {
            userId: true,
            username: true,
            profilePictureUrl: true,
            cognitoId: true,
            teamId: true,
          },
        },
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
        email: "", // Required by User interface but not in schema
      },
      assignee: task.assignee
        ? {
            userId: task.assignee.userId,
            username: task.assignee.username,
            profilePictureUrl: task.assignee.profilePictureUrl || undefined,
            cognitoId: task.assignee.cognitoId,
            teamId: task.assignee.teamId || undefined,
            email: "", // Required by User interface but not in schema
          }
        : undefined,
    }));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks");
  }
}
