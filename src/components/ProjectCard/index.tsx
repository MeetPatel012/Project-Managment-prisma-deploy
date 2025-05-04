import { Project } from "@/state/api";
import React from "react";

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  return (
    <div className="rounded border p-4 shadow">
      <h3>{project.name}</h3>
      <h3>{project.description}</h3>
      <h3>Start Date: {project.startDate}</h3>
      <h3>End Date: {project.endDate}</h3>
    </div>
  );
};

export default ProjectCard;
