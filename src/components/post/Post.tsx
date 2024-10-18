import AvatarComponent from "../avatar-component/Avatar";

const Post = ({ data, userData }) => {
  return (
    <div className="">
      <AvatarComponent data={data?.user} />
    </div>
  );
};

export default Post;
