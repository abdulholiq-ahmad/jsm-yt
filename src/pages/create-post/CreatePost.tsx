import { FC } from "react";
import Caption from "@/components/caption/Caption";
import createPostImg from "../../assets/images/create-post.svg";
import AddPhoto from "@/components/add-photo/AddPhoto";
import LocationInput from "@/components/location-input/LocationInput";
import AltPhoto from "@/components/alt-photo/AltPhoto";

const CreatePost: FC = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <div className="flex w-full font-inter text-white bg-aside h-full">
      <div className="w-full px-14 pt-20">
        <div className="flex items-center gap-2 mb-6">
          <img className="invert brightness-0" src={createPostImg} alt="Create Post Img" width={36} />
          <h2 className="font-inter text-4xl font-bold">Create Post</h2>
        </div>

        <form onSubmit={() => handleSubmit} action="" className="flex flex-col">
          <Caption />
          <AddPhoto />
          <LocationInput />
          <AltPhoto />

          <button className="inline-block p-2 bg-hoverPrimary rounded-lg max-w-[120px] ml-auto" type="submit">
            Share Post
          </button>
        </form>
      </div>
      <div className="w-[420px]">
        <h2>Profile</h2>
      </div>
    </div>
  );
};

export default CreatePost;
