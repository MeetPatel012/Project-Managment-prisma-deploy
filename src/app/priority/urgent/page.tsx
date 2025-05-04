import { Priority } from "@/state/api";
import ReusablePriorityPage from "../reusablePriorityPage";

function Urgent() {
  return <ReusablePriorityPage priority={Priority.Urgent} />;
}

export default Urgent;
