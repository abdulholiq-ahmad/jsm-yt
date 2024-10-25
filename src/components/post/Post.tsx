import AvatarComponent from "../avatar-component/Avatar";

const Post = ({ data }) => {
  if (!data || !Array.isArray(data)) {
    return <div></div>;
  }

  console.log(data.map((post) => post.owner.photo));

  return (
    <div className="text-white">
      {data.map((post) => (
        <div key={post.id} className="mb-4 flex items-center gap-3">
          <AvatarComponent data={post.owner.photo} />
          <span>
            <h3 className="text-white">{post.title}</h3>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Post;
