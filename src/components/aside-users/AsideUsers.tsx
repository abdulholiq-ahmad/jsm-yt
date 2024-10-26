import { FC } from "react";
import Users from "../users/Users";
import { useUnFollowMutation, useFollowMutation, useGetUsersQuery } from "@/redux/api/user-api";
import { UserData } from "@/types";
import SkeletonUsers from "../skeleton/SkeletonUsers";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

export type PartialUserData = Omit<UserData, "_id" | "fullName"> & {
  handleFollow: (username: string) => void;
  handleUnFollow: (username: string) => void;
  isFollowing: boolean;
};

const AsideUsers: FC = () => {
  const { data, isLoading } = useGetUsersQuery({ limit: 8 });
  const [follow] = useFollowMutation();
  const [unfollow] = useUnFollowMutation();

  const currentUserId = localStorage.getItem("currentUserId");

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
    const isFollowing = item.followers?.some((follower) => follower?._id === currentUserId);

    return (
      <Users
        key={item?._id ?? ""}
        photo={item?.photo}
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

  const userItemSkeleton: JSX.Element[] = Array(8)
    .fill(0)
    .map((_, index) => <SkeletonUsers key={index} />);

  return (
    <aside className="sticky px-2 pl-6 top-0 right-0 min-w-[420px] bg-[#09090A] h-screen text-white font-inter pt-[48px] pb-[20px] overflow-y-auto">
      <h1 className="sr-only">Aside Users</h1>
      <span className="flex items-center justify-between mb-10 px-5">
        <h2 className="text-2xl font-bold">Top Creators</h2>

        <Link to={"/people"} className="flex items-center gap-1 text-[#877EFF] hover:underline">
          See all
          <MdKeyboardArrowRight className="size-6" />
        </Link>
      </span>
      <div className="w-full grid grid-cols-2 gap-6 pr-4">{isLoading ? userItemSkeleton : userItem}</div>
    </aside>
  );
};

export default AsideUsers;
