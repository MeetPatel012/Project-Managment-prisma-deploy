"use server";

import { Status } from "@/lib/constant";
import prisma from "@/lib/prisma";
import { Priority, SearchResult } from "@/state/api";

export async function searchItems(searchTerm: string): Promise<SearchResult> {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { title: { contains: searchTerm, mode: "insensitive" } },
          { description: { contains: searchTerm, mode: "insensitive" } },
        ],
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

    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: "insensitive" } },
          { description: { contains: searchTerm, mode: "insensitive" } },
        ],
      },
    });

    const users = await prisma.user.findMany({
      where: {
        username: { contains: searchTerm, mode: "insensitive" },
      },
    });

    return {
      tasks: tasks.map((task) => ({
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
      })),
      projects: projects.map((project) => ({
        id: project.id,
        name: project.name,
        description: project.description || undefined,
        startDate: project.startDate?.toISOString() || undefined,
        endDate: project.endDate?.toISOString() || undefined,
      })),
      users: users.map((user) => ({
        userId: user.userId,
        username: user.username,
        profilePictureUrl: user.profilePictureUrl || undefined,
        cognitoId: user.cognitoId,
        teamId: user.teamId || undefined,
        email: "",
      })),
    };
  } catch (error) {
    console.error("Error searching:", error);
    throw new Error("Search failed");
  }
}
