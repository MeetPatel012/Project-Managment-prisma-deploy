import { getUsers } from "@/server-actions/_users_actions";
import UsersComponent from "./UsersComponent";

export default async function UsersPage() {
  const users = await getUsers();
  return <UsersComponent initialUsers={users} />;
}
