import { FC } from "react";

interface ProfilePostProps {
  url: string;
  type: string;
}

const ProfilePost: FC<ProfilePostProps> = ({ url, type }) => {
  return (
    <div className="w-[330px] h-[315px] rounded-md">
      {type === "IMAGE" ? (
        <img src={url} alt="" className="w-full h-full object-contain rounded-md" />
      ) : (
        <video src={url} controls className="w-full h-full object-contain rounded-md" />
      )}
    </div>
  );
};

export default ProfilePost;
