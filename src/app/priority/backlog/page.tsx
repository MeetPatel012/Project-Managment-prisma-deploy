import { Priority } from "@/state/api";
import ReusablePriorityPage from "../reusablePriorityPage";

function Backlog() {
  return <ReusablePriorityPage priority={Priority.Backlog} />;
}

export default Backlog;
