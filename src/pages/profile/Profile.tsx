import { FC, useState } from "react";
import AvatarProfile from "@/components/avatar-component/AvatarProfile";
import { useGetSingleProfileQuery } from "@/redux/api/profile-api";
import { useFollowMutation, useUnFollowMutation } from "@/redux/api/user-api";
import { Link, useParams } from "react-router-dom";
import EditProfileIcon from "@/assets/images/edit-profile-icon.svg";
import MovieIcon from "@/assets/images/movie.svg";
import FAQIcon from "@/assets/images/Profile-Pic-S.svg";
import Masterclass from "@/assets/images/masterclass.svg";
import PostsIcon from "@/assets/images/posts.svg";
import ReelsIcon from "@/assets/images/reels.svg";
import TaggedIcon from "@/assets/images/tagged.svg";
import ProfilePost from "@/components/post/ProfilePost";

const Profile: FC = () => {
  const { username } = useParams();
  const { data: profile, isLoading } = useGetSingleProfileQuery({ username });
  const [follow] = useFollowMutation();
  const [unfollow] = useUnFollowMutation();
  const [hightligts, setHightlights] = useState([
    {
      text: "React Course",
      url: MovieIcon,
    },
    {
      text: "Masterclass",
      url: Masterclass,
    },
    {
      text: "FAQ",
      url: FAQIcon,
    },
  ]);

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

  const ProfilePostItem = profile?.posts?.map((post: any) => <ProfilePost key={post._id} url={post} />);

  console.log(profile);
  return (
    <div className="container text-white py-20">
      <div className="flex flex-col items-start gap-10">
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
                  <button
                    className={`p-2 px-4 rounded-lg text-sm font-semibold ${following ? "bg-gray-500" : "bg-[#877EFF]"}`}
                    onClick={toggleFollow}
                  >
                    {following ? "Unfollow" : "Follow"}
                  </button>
                )}
              </div>
            </div>
            <ul className="flex items-center gap-10">
              <li className="flex flex-col items-start cursor-pointer">
                <span className="text-[#877EFF] text-lg">{profile?.posts?.length}</span>
                <span className="text-white text-sm ">Posts</span>
              </li>
              <li className="flex flex-col items-start cursor-pointer">
                <span className="text-[#877EFF] text-lg">{profile?.followers?.length}</span>
                <span className="text-white text-sm">Followers</span>
              </li>
              <li className="flex flex-col items-start cursor-pointer">
                <span className="text-[#877EFF] text-lg">{profile?.following?.length}</span>
                <span className="text-white text-sm">Following</span>
              </li>
            </ul>

            <div>
              {profile?.bio?.length <= 0 && <p className="py-2 bg-[#101012] px-4 rounded-md font-medium">You can write your</p>}
              <p className="text-base leading-tight">{profile?.bio.length > 0 && profile?.bio}</p>
            </div>

            <div className="flex items-center gap-10">
              {hightligts.map((highlight: { text: string; url: string }, index: number) => (
                <div key={index} className="flex flex-col items-center justify-center gap-3">
                  <img src={highlight.url} alt={highlight.text} className="border-2 border-[#7878A3] border-spacing-4 rounded-full" />
                  <p className="text-xs">{highlight.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center bg-[#09090A] border border-[#101012] rounded-md">
          <Link className="flex items-center justify-center gap-3 px-12 py-3 bg-[#101012] hover:bg-[#1F1F22]" to={"*"}>
            <img src={PostsIcon} alt="Posts icon" width={20} />
            <p className="font-medium">Posts</p>
          </Link>
          <Link className="flex items-center justify-center gap-3 px-12 py-3 hover:bg-[#101012]" to={"*"}>
            <img src={ReelsIcon} alt="Posts icon" width={20} />
            <p className="font-medium">Reels</p>
          </Link>
          <Link className="flex items-center justify-center gap-3 px-12 py-3 hover:bg-[#101012]" to={"*"}>
            <img src={TaggedIcon} alt="Posts icon" width={20} />
            <p className="font-medium">Tagged</p>
          </Link>
        </div>
        <div>{profile?.posts?.length > 0 ? ProfilePostItem : null}</div>
      </div>
    </div>
  );
};

export default Profile;
