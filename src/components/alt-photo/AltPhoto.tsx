import { FC } from "react";

interface AltPhotoProps {
  handleOnChange: (value: string) => void;
}

const AltPhoto: FC<AltPhotoProps> = ({ handleOnChange }) => {
  return (
    <>
      <div className="flex flex-col mb-5">
        <h2 className="text-lg font-inter font-medium mb-3">Photo/Video Alt Text</h2>
        <div className="relative">
          <input
            onChange={(e) => handleOnChange(e.target.value)}
            className="w-full bg-aside-600 rounded-xl px-4 py-4 outline-none focus-within:ring-2 focus-within:ring-hoverPrimary text-white"
            type="text"
          />
        </div>
      </div>
    </>
  );
};

export default AltPhoto;
