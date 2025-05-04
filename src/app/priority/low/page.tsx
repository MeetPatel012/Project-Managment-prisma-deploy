import { Priority } from "@/state/api";
import ReusablePriorityPage from "../reusablePriorityPage";

function Low() {
  return <ReusablePriorityPage priority={Priority.Low} />;
}

export default Low;
