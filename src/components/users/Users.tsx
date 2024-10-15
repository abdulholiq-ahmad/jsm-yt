import { useGetUsersQuery } from "@/redux/api/user-api";

const Users = () => {
  const { data } = useGetUsersQuery({});

  return <div>Users</div>;
};

export default Users;
