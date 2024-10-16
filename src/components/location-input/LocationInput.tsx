import { FC } from "react";
import LocationIcon from "../../assets/images/map-point.svg";

interface LocationInputProps {
  handleOnChange: (value: string) => void;
  value: string;
}

const LocationInput: FC<LocationInputProps> = ({ handleOnChange, value }) => {
  return (
    <>
      <div className="flex flex-col mb-3">
        <h2 className="text-lg font-inter font-medium mb-3">Location</h2>
        <div className="relative">
          <input
            onChange={(e) => handleOnChange(e.target.value)}
            className="w-full bg-aside-600 rounded-xl px-4 py-4 outline-none focus-within:ring-2 focus-within:ring-hoverPrimary text-white"
            type="text"
            value={value}
          />
          <img className="absolute top-3.5 right-3.5" src={LocationIcon} alt="Location icon" width={20} />
        </div>
      </div>
    </>
  );
};

export default LocationInput;
