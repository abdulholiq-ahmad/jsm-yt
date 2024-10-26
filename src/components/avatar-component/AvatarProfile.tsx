import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

interface AvatarComponentProps {
  data: {
    username: string;
    photo: string;
  };
}

const AvatarProfile: FC<AvatarComponentProps> = ({ data }) => {
  return (
    <>
      <Avatar className="w-24 h-24">
        <AvatarImage src={data?.photo?.includes("/profile_not_found.png") ? "" : data?.photo} />
        <AvatarFallback className="text-hoverPrimary uppercase text-2xl">{data?.username?.slice(0, 2)}</AvatarFallback>
      </Avatar>
    </>
  );
};

export default AvatarProfile;
