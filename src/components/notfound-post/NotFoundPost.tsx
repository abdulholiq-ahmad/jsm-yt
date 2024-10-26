import PostIcon from "@/assets/images/posts.svg";

const NotFoundPost = () => {
  return (
    <div className="flex flex-col items-center w-full space-y-2">
      <img className="invert brightness-0" src={PostIcon} alt="" width={100} />
      <h2 className="text-xl font-semibold">Share posts</h2>
      <p className="text-sm text-[#7878A3]">When you share photos, they will appear on your profile.</p>
    </div>
  );
};

export default NotFoundPost;
