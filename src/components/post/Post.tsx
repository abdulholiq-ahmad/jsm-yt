import AvatarComponent from "../avatar-component/Avatar";
import { PostData } from "@/types";
import dayjs from "dayjs";
import EditIcon from "@/assets/images/edit-icon.svg";
import CarouselComponent from "../carusel/CarouselComponent";
import { useGetProfileQuery } from "@/redux/api/user-api";
import { BsFolderX } from "react-icons/bs";
import LikeIcon from "@/assets/images/heart.svg";
import SendIcon from "@/assets/images/send-icon.svg";
import LikedIcon from "@/assets/images/heart-red.svg";
import CommentIcon from "@/assets/images/comment-icon.svg";
import ShareIcon from "@/assets/images/share-icon.svg";
import SaveIcon from "@/assets/images/save-icon.svg";
import { useToggleLikeMutation } from "@/redux/api/post-api";
import { useState } from "react";
import { Link } from "react-router-dom";

interface PostProps {
  data: PostData;
  refetch: () => void;
}

const Post = ({ data, refetch }: PostProps) => {
  console.log(data);
  const formattedDate: string = data?.createdAt ? dayjs(data.createdAt).format("D MMMM [at] hh:mm A") : "Unknown date";
  const { data: profile } = useGetProfileQuery({});
  const [isLiked, setIsLiked] = useState(data?.likes?.includes(profile?._id) || false);

  const renderCaption = (caption: string) => {
    const parts = caption.split(/(#\w+)/g);
    return parts.map((part, index) => {
      if (part.startsWith("#")) {
        return (
          <span key={index} className="text-[#5C5C7B] font-semibold">
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  const [like] = useToggleLikeMutation({});

  const handleToggleLike = async (id: number) => {
    setIsLiked((prev) => !prev);
    await like({ id }).unwrap();
    refetch();
  };

  return (
    <div className="text-white py-9 px-7">
      <div key={data.id} className="mb-4 flex flex-col gap-4">
        <span className="flex items-start gap-2">
          <AvatarComponent data={data?.owner} />
          <span>
            <Link to={`/profile/${data?.owner?.username}`}>
              <p className="capitalize text-lg font-bold">{data?.owner?.username}</p>
            </Link>
            <p className="text-sm font-medium leading-tight text-[#7878A3]">{formattedDate}</p>
          </span>
          <button className="ml-auto hover:opacity-90">
            <img src={EditIcon} alt="Edit pencil icon" width={25} />
          </button>
        </span>
        <span>
          <h3 className="text-white text-base font-semibold leading-tight">{renderCaption(data?.caption)}</h3>
        </span>
      </div>

      {data.content.length > 0 ? (
        <CarouselComponent data={data.content.map((url) => ({ type: "VIDEO", url }))} contentAlt={data?.contentAlt} />
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-[400px] bg-gray-300 rounded-md">
          <BsFolderX className="size-20 text-[#877EFF]" />
          <p className="text-[#877EFF]">No content available</p>
        </div>
      )}

      <div className="flex items-center gap-8 py-3">
        <div className="flex items-center gap-1">
          <button className="hover:opacity-80" onClick={() => handleToggleLike(data?._id)}>
            {isLiked ? <img src={LikedIcon} alt="Like icon" width={20} /> : <img src={LikeIcon} alt="Like icon" width={20} />}
          </button>
          <span className="text-sm font-semibold">{data?.likes?.length > 0 && data?.likes?.length}</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="hover:opacity-80">
            <img src={CommentIcon} alt="Like icon" width={20} />
          </button>
          <span className="text-sm font-semibold">{data?.comments?.length > 0 && data?.comments?.length}</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="hover:opacity-80">
            <img src={ShareIcon} alt="Like icon" width={20} />
          </button>
        </div>
        <div className="flex items-center gap-1 ml-auto">
          <button className="hover:opacity-80">
            <img src={SaveIcon} alt="Like icon" width={20} />
          </button>
        </div>
      </div>

      <div className="flex gap-4 mt-2">
        <AvatarComponent data={profile} />
        <div className="relative w-full flex items-center">
          <textarea
            placeholder="Write your comment..."
            rows={1}
            className="bg-[#101012] resize-none placeholder:text-base placeholder:text-[#5C5C7B] w-full rounded-xl px-3 py-2 outline-none focus-within:ring-2 focus-within:ring-hoverPrimary focus-within:border-primary-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#1F1F22]"
            id="comment"
          ></textarea>
          <button className="absolute p-3 right-0 top-2 hover:opacity-80">
            <img src={SendIcon} alt="Send icon" width={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
