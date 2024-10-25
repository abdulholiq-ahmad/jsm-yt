import { UserData } from "@/types";
import { FC, useState } from "react";
import { PartialUserData } from "../aside-users/AsideUsers";
import AvatarComponent from "../avatar-component/Avatar";

type UserProps = {
  handleFollow: (username: string) => void;
  handleUnFollow: (username: string) => void;
  isFollowing: boolean;
};

const Users: FC<UserData & UserProps & PartialUserData> = ({ photo, username, fullName, _id, handleFollow, handleUnFollow, isFollowing }) => {
  const [following, setFollowing] = useState(isFollowing);

  const toggleFollow = () => {
    if (following) {
      handleUnFollow(username);
    } else {
      handleFollow(username);
    }
    setFollowing(!following);
  };

  return (
    <div key={_id} className="border border-[#1F1F22] bg-[#09090A] py-6 px-8 max-w-[190px] max-h-[190px] rounded-3xl">
      <div className="flex items-center justify-center mb-2">
        <AvatarComponent data={{ photo, username }} />
      </div>
      <div className="flex flex-col items-center">
        <h3 className="capitalize text-sm font-semibold mb-1" title={fullName}>
          {username}
        </h3>
        <p className="text-[10px] text-[#7878A3] font-inter tracking-wide mb-3 line-clamp-1">Followed by john</p>
        <button onClick={toggleFollow} className={`p-2 px-4 rounded-lg text-sm font-semibold ${following ? "bg-gray-500" : "bg-[#877EFF]"}`}>
          {following ? "Unfollow" : "Follow"}
        </button>
      </div>
    </div>
  );
};

export default Users;
