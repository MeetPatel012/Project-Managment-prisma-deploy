"use server"

import prisma from "@/lib/prisma";

export async function getSidebarProjects() {
  try {
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: 'asc'
      }
    });
    return projects;
  } catch (error) {
    throw new Error("Failed to fetch sidebar projects");
  }
}