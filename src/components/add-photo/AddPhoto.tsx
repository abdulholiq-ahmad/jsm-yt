import { FC } from "react";
import PhotoAndVideo from "../../assets/images/photo-and-video.svg";

interface AddPhotoProps {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  url: string[] | null;
}

const AddPhoto: FC<AddPhotoProps> = ({ handleFileChange, url }) => {
  return (
    <div className="mb-3">
      <h3 className="text-lg font-inter font-medium mb-3">Add Photos/Videos</h3>
      <div className="bg-aside-600 py-12 px-6 rounded-3xl">
        <label htmlFor="drag-zone" className="flex flex-col items-center justify-center">
          <div className="flex gap-4 flex-wrap">
            {url && url.length > 0 ? (
              url.map((url, inx) => <img key={inx} className="mx-auto mb-3" src={url} alt={`Uploaded ${inx}`} width={250} />)
            ) : (
              <img className="mx-auto mb-3" src={PhotoAndVideo} alt="Photo and Video icons" width={96} />
            )}
          </div>

          {url === null ||
            (url.length === 0 && (
              <>
                <h4 className="text-center font-inter font-semibold text-lg text-[#EFEFEF] tracking-wide mb-2">
                  Drag photos and videos here
                </h4>
                <p className="text-center text-xs text-infoText mb-4">SVG, PNG, JPG or GIF (max. 800x400px)</p>
              </>
            ))}

          <input onChange={handleFileChange} type="file" hidden id="drag-zone" accept="image/*" multiple />

          <div
            className="p-3 px-5 rounded-lg border cursor-pointer border-[#1F1F22] bg-[#1F1F22] flex items-center justify-center font-inter text-sm font-semibold hover:opacity-85 outline-none active:opacity-95 focus-within:ring-2 focus-within:ring-hoverPrimary"
            autoFocus
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                document.getElementById("drag-zone")?.click();
              }
            }}
          >
            Select from computer
          </div>
        </label>
      </div>
    </div>
  );
};

export default AddPhoto;
