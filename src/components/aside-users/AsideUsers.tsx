import { FC } from "react";
import Users from "../users/Users";
import { useGetUsersQuery } from "@/redux/api/user-api";

const AsideUsers: FC = () => {
  const { data } = useGetUsersQuery({});
  console.log(data);

  const handleFollow = () => {};
  return (
    <aside className="w-1/4 bg-aside h-screen px-14 text-white font-inter pt-[48px]">
      <h1 className="sr-only">Aside Users</h1>
      <div className="grid grid-cols-2">
        <Users />
      </div>
    </aside>
  );
};

export default AsideUsers;
