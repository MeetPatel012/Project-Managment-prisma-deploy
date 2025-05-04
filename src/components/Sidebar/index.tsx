"use server";

import { getSidebarProjects } from "@/server-actions/_sidebar_action";
import SidebarWrapper from "./SidebarComponent";

export default async function Sidebar() {
  const projects = await getSidebarProjects();
  return <SidebarWrapper initialProjects={projects} />;
}
