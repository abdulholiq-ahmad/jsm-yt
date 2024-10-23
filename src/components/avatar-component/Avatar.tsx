import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

const AvatarComponent = ({ data }) => {
  return (
    <>
      <Avatar className="w-14 h-14">
        <AvatarImage src={data} />
        <AvatarFallback className="text-hoverPrimary uppercase"></AvatarFallback>
      </Avatar>
    </>
  );
};

export default AvatarComponent;
