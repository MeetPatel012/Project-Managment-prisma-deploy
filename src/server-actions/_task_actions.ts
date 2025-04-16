"use server";

import { CreateTaskInput } from "@/lib/constant";
import prisma from "@/lib/prisma";
import { Priority, Status } from "@/state/api";

export async function createTask(data: CreateTaskInput) {
  try {
    const task = await prisma.task.create({
      data: {
        ...data,
        tags: data.tags
          .split(",")
          .map((tag) => tag.trim())
          .join(","), // Convert array back to comma-separated string
      },
    });
    return { success: true, task };
  } catch (error) {
    console.error("Error creating task:", error);
    return { success: false, error: "Failed to create task" };
  }
}
