"use client";

import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import { getProjectTasks } from "@/server-actions/_board_actions";
import { Task } from "@/state/api";
import React, { useEffect, useState } from "react";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

function ListView({ id, setIsModalNewTaskOpen }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        const projectTasks = await getProjectTasks(Number(id));
        setTasks(projectTasks);
        setError(null);
      } catch (err) {
        console.error("Failed to load tasks:", err);
        setError("An error occurred while fetching tasks");
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="List"
          buttonComponent={
            <button
              className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              Add Task
            </button>
          }
          isSmallText
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default ListView;
