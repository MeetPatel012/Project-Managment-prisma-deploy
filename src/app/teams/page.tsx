import { getTeams } from "@/server-actions/_teams_actions";
import TeamsComponent from "./TeamsComponent";

export default async function TeamsPage() {
  const teams = await getTeams();
  return <TeamsComponent initialTeams={teams} />;
}
