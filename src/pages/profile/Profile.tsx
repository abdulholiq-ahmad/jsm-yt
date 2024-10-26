import { FC, useState } from "react";
import AvatarProfile from "@/components/avatar-component/AvatarProfile";
import { useGetSingleProfileQuery } from "@/redux/api/profile-api";
import { useFollowMutation, useUnFollowMutation } from "@/redux/api/user-api";
import { useParams } from "react-router-dom";
import EditProfileIcon from "@/assets/images/edit-profile-icon.svg";

const Profile: FC = () => {
  const { username } = useParams();
  const { data: profile, isLoading } = useGetSingleProfileQuery({ username });
  console.log(profile);
  const [follow] = useFollowMutation();
  const [unfollow] = useUnFollowMutation();

  const currentUserId = localStorage.getItem("currentUserId");
  const [following, setFollowing] = useState<boolean>(
    profile?.followers?.some((follower: { _id: string }) => follower?._id === currentUserId) || false
  );

  const handleFollow = (username: string): void => {
    if (username) {
      follow(username);
      setFollowing(true);
    } else {
      console.log("No username provided");
    }
  };

  const handleUnfollow = (username: string): void => {
    if (username) {
      unfollow(username);
      setFollowing(false);
    } else {
      console.log("No username provided");
    }
  };

  const toggleFollow = () => {
    if (following) {
      handleUnfollow(profile?.username ?? "");
    } else {
      handleFollow(profile?.username ?? "");
    }
  };

  return (
    <div className="container text-white py-20">
      <div className="flex gap-4">
        <AvatarProfile data={profile} />
        <div className="flex flex-col gap-8">
          <div className="flex gap-10 items-start">
            <div className="">
              <h2 className="capitalize text-4xl leading-tight">{profile?.fullName}</h2>
              <p className="text-lg text-[#7878A3]">{`@${profile?.username}`}</p>
            </div>
            <div>
              {currentUserId === profile?._id ? (
                <button className="flex items-center gap-2 bg-[#101012] hover:bg-[#1F1F22] text-white px-5 py-2 rounded-md text-sm transition-all duration-100 ease-in">
                  <img src={EditProfileIcon} alt="Edit profile" width={16} />
                  Edit Profile
                </button>
              ) : (
                <button className={`p-2 px-4 rounded-lg text-sm font-semibold ${following ? "bg-gray-500" : "bg-[#877EFF]"}`} onClick={toggleFollow}>
                  {following ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
          </div>
          <ul className="flex items-center gap-10">
            <li className="flex flex-col items-start">
              <span className="text-[#877EFF] text-lg">{profile?.posts?.length}</span>
              <span className="text-white">Posts</span>
            </li>
            <li className="flex flex-col items-start">
              <span className="text-[#877EFF] text-lg">{profile?.followers?.length}</span>
              <span className="text-white text-sm">Followers</span>
            </li>
            <li className="flex flex-col items-start">
              <span className="text-[#877EFF] text-lg">{profile?.following?.length}</span>
              <span className="text-white text-sm">Following</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
