import AvatarComponent from "../avatar-component/Avatar";
import { PostData } from "@/types";
import dayjs from "dayjs";
import EditIcon from "@/assets/images/edit-icon.svg";
import CarouselComponent from "../carousel/CarouselComponent";

const Post = ({ data }: { data: PostData }) => {
  console.log(data);
  const formattedDate: string = data?.createdAt ? dayjs(data.createdAt).format("D MMMM [at] hh:mm A") : "Unknown date";

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

  return (
    <div className="text-white py-9 px-7">
      <div key={data.id} className="mb-4 flex flex-col gap-4">
        <span className="flex items-start gap-2">
          <AvatarComponent data={data?.owner} />
          <span>
            <p className="capitalize text-lg font-bold">{data?.owner?.username}</p>
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
      <CarouselComponent data={data.content} />
    </div>
  );
};

export default Post;
