"use server"

import prisma from "@/lib/prisma";

export async function createProject(data: {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}) {
  try {
    const project = await prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      },
    });
    return project;
  } catch (error) {
    throw new Error("Failed to create project");
  }
}