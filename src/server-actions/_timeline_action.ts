"use server"

import prisma from "@/lib/prisma";

export async function getTimelineProjects() {
  try {
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        startDate: true,
        endDate: true,
      },
    });
    return projects;
  } catch (error) {
    throw new Error("Failed to fetch projects for timeline");
  }
}