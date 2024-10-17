import { FC } from "react";
import Users from "../users/Users";
import { useUnFollowMutation, useFollowMutation, useGetUsersQuery } from "@/redux/api/user-api";
import { UserData } from "@/types";

export type PartialUserData = Omit<UserData, "_id" | "fullName"> & {
  handleFollow: (username: string) => void;
  handleUnFollow: (username: string) => void;
  isFollowing: boolean;
};

const AsideUsers: FC = () => {
  const { data } = useGetUsersQuery({ limit: 8 });
  const [follow] = useFollowMutation();
  const [unfollow] = useUnFollowMutation();

  const currentUserId = localStorage.getItem("currentUserId");
  console.log(currentUserId);

  const handleFollow = (username: string): void => {
    if (username) {
      follow(username);
    } else {
      console.log("No username");
    }
  };

  const handleUnfollow = (username: string): void => {
    if (username) {
      unfollow(username);
    } else {
      console.log("No username");
    }
  };

  const userItem: JSX.Element[] = data?.map((item: UserData) => {
    const isFollowing = item.followers?.some((follower) => follower._id === currentUserId);

    return (
      <Users
        key={item?._id ?? ""}
        photo={import.meta.env.VITE_API_BASE_URL + item?.photo}
        username={item?.username}
        fullName={item?.fullName}
        _id={item?._id ?? ""}
        followers={item?.followers}
        handleFollow={handleFollow}
        handleUnFollow={handleUnfollow}
        isFollowing={isFollowing}
      />
    ) as React.ReactElement<PartialUserData>;
  });

  return (
    <aside className="sticky px-2 top-0 right-0 min-w-[420px] bg-[#09090A] h-screen text-white font-inter pt-[48px]">
      <h1 className="sr-only">Aside Users</h1>
      <h2 className="text-2xl font-bold mb-10">Top Creators</h2>
      <div className="w-full grid grid-cols-2 gap-6 pr-4">{userItem}</div>
    </aside>
  );
};

export default AsideUsers;
