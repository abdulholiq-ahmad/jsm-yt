import { FC } from "react";

interface CaptionProps {
  handleCaptionChange: (e: any) => void;
}

const Caption: FC<CaptionProps> = ({ handleCaptionChange }) => {
  return (
    <>
      <div className="flex flex-col gap-2 mb-3">
        <label className="text-lg font-inter font-medium" htmlFor="caption">
          Caption
        </label>
        <textarea
          onChange={(e) => handleCaptionChange(e.target.value)}
          rows={5}
          className="w-full resize-none bg-aside-600 rounded-xl px-3 py-2 outline-none focus-within:ring-2 focus-within:ring-hoverPrimary focus-within:border-primary-300"
          name="caption"
          id="caption"
        ></textarea>
      </div>
    </>
  );
};

export default Caption;
