import { FC, useState } from "react";
import { UserData } from "@/types";
import { PartialUserData } from "@/components/aside-users/AsideUsers";
import { useFollowMutation, useGetUsersQuery, useUnFollowMutation } from "@/redux/api/user-api";
import Users from "@/components/users/Users";
import SkeletonUsers from "@/components/skeleton/SkeletonUsers";
import AllUserIcon from "@/assets/images/all-user.svg";
import { ReloadIcon } from "@radix-ui/react-icons";

const People: FC<PartialUserData> = () => {
  const [limit, setLimit] = useState(20);
  const { data, refetch, isFetching } = useGetUsersQuery({ limit });
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
    const isFollowing = item.followers?.some((follower: { _id: string }) => follower?._id === currentUserId);

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

  const refetchUsers = () => {
    setLimit(limit + 20);
    refetch();
  };

  return (
    <>
      <div className="container bg-[#09090A] w-full h-full text-white pt-20 pb-5">
        <span className="flex items-center gap-3 mb-7">
          <img src={AllUserIcon} alt="All people icon" width={36} />
          <h2 className="font-bold text-4xl leading-tight capitalize">All users</h2>
        </span>
        <div>
          <div className="grid grid-cols-5 gap-4 mb-5">
            {userItem}
            {isFetching &&
              Array(15)
                .fill(0)
                .map((_, index) => <SkeletonUsers key={index} />)}
          </div>
          <div className="flex justify-center">
            {data?.length >= limit && (
              <button
                disabled={isFetching}
                onClick={refetchUsers}
                className={`capitalize p-2 px-6 rounded-lg flex items-center text-sm font-semibold bg-[#877EFF]  ${isFetching ? "bg-gray-400" : ""}`}
              >
                {isFetching ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait
                  </>
                ) : (
                  "see more"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default People;
