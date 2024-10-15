import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

const AvatarComponent = () => {
  return (
    <>
      <Avatar className="w-14 h-14">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback></AvatarFallback>
      </Avatar>
    </>
  );
};

export default AvatarComponent;
