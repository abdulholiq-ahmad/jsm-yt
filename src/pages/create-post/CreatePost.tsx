import { FC, useState } from "react";
import Caption from "@/components/caption/Caption";
import createPostImg from "../../assets/images/create-post.svg";
import AddPhoto from "@/components/add-photo/AddPhoto";
import LocationInput from "@/components/location-input/LocationInput";
import AltPhoto from "@/components/alt-photo/AltPhoto";
import { useSetPostMutation } from "@/redux/api/user-api";

const CreatePost: FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [fileURLs, setFileURLs] = useState<string[]>([]);
  const [caption, setCaption] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [contentAlt, setContentAlt] = useState<string>("");

  const [uploadPost] = useSetPostMutation({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files as FileList);
    const newFileURLs = selectedFiles.map((file) => URL.createObjectURL(file));
    setFiles(selectedFiles);
    setFileURLs(newFileURLs);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("images", file);
    });

    const newPost = {
      content: fileURLs,
      caption,
      location,
      content_alt: contentAlt,
    };

    uploadPost(newPost)
      .unwrap()
      .then((res) => console.log(res))
      .finally(() => {
        setFiles([]);
        setFileURLs([]);
        setCaption("");
        setLocation("");
        setContentAlt("");
      });
  };

  return (
    <div className="flex w-full font-inter text-white bg-aside h-full">
      <div className="w-full px-14 pt-20">
        <div className="flex items-center gap-2 mb-6">
          <img className="invert brightness-0" src={createPostImg} alt="Create Post Img" width={36} />
          <h2 className="font-inter text-4xl font-bold">Create Post</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <Caption handleCaptionChange={(value) => setCaption(value)} value={caption} />
          <AddPhoto handleFileChange={handleFileChange} url={fileURLs} />
          <LocationInput handleOnChange={(value) => setLocation(value)} value={location} />
          <AltPhoto handleOnChange={(value) => setContentAlt(value)} value={contentAlt} />

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
