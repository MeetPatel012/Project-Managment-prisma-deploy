import { getTimelineProjects } from "../../server-actions/_timeline_action";
import TimelineComponent from "./TimelineComponent";

export default async function TimelinePage() {
  const projects = await getTimelineProjects();
  return <TimelineComponent initialProjects={projects} />;
}
