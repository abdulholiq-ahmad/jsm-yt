import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

const AvatarComponent = ({ data }) => {
  console.log(data?.username);
  return (
    <>
      <Avatar className="w-14 h-14">
        <AvatarImage src={data?.photo} />
        <AvatarFallback className="text-hoverPrimary uppercase">{data?.username.slice(0, 2)}</AvatarFallback>
      </Avatar>
    </>
  );
};

export default AvatarComponent;
