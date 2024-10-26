import { FC } from "react";

interface ProfilePostProps {
  url: string;
}

const ProfilePost: FC<ProfilePostProps> = ({ url }) => {
  return (
    <div className="w-[330px] h-[315px]">
      <img src={url} alt="" />
    </div>
  );
};

export default ProfilePost;
