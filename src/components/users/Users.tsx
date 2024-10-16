import { FC } from "react";

const Users: FC = ({ url, name, followed, handleFollow }) => {
  return (
    <div className="border border-[#1F1F22] bg-[#09090A] py-6 px-8 min-w-[190px]">
      <img src={url} alt={name + " avatar"} width={54} />
      <div>
        <h3>{name}</h3>
        <p className="text-hoverPrimary">Followed by jsmastery</p>
      </div>
    </div>
  );
};

export default Users;
