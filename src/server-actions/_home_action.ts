"use server";

import prisma from "@/lib/prisma";

export async function getTasks(projectId: number) {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: projectId,
      },
      include: {
        author: true,
        assignee: true,
      },
    });
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks");
  }
}

export async function getProjects() {
  try {
    const projects = await prisma.project.findMany();
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects");
  }
}