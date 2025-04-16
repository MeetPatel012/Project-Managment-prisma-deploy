import { Priority } from "@/state/api";
import ReusablePriorityPage from "../reusablePriorityPage";

function Medium() {
  return <ReusablePriorityPage priority={Priority.Medium} />;
}

export default Medium;
