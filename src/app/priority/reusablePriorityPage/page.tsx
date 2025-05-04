import { Priority } from "@/lib/constant";
import { getTasksByUserAndPriority } from "@/server-actions/_priority_actions";
import ReusablePriorityPageComponent from "./PriorityPageComponent";

interface PageProps {
  priority: Priority;
}

export default async function PriorityPage({ priority }: PageProps) {
  const userId = 1; // You might want to get this from session/auth
  const tasks = await getTasksByUserAndPriority(userId, priority);
  return (
    <ReusablePriorityPageComponent initialTasks={tasks} priority={priority} />
  );
}
