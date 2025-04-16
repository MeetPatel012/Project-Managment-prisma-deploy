import { Priority } from "@/state/api";
import ReusablePriorityPage from "../reusablePriorityPage";

function High() {
  return <ReusablePriorityPage priority={Priority.High} />;
}

export default High;
