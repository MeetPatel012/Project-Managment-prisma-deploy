import { getProjects, getTasks } from "@/server-actions/_home_action";
import HomePage from "./HomePage";

export default async function Home() {
  const [tasks, projects] = await Promise.all([getTasks(1), getProjects()]);

  return <HomePage initialTasks={tasks} initialProjects={projects} />;
}
