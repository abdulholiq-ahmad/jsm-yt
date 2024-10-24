import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

interface AvatarComponentProps {
  data: {
    username: string;
    photo: string;
  };
}

const AvatarComponent: FC<AvatarComponentProps> = ({ data }) => {
  console.log(data);
  return (
    <>
      <Avatar className="w-14 h-14">
        <AvatarImage src={data.photo.includes("/profile_not_found.png") ? "" : data.photo} />
        <AvatarFallback className="text-hoverPrimary uppercase">{data?.username.slice(0, 2)}</AvatarFallback>
      </Avatar>
    </>
  );
};

export default AvatarComponent;
