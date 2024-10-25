import { FC } from "react";
import { Skeleton } from "../ui/skeleton";

const SkeletonPost: FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <Skeleton className="h-14 w-14 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-[150px]" />
        <Skeleton className="h-3 w-[100px]" />
      </div>
    </div>
  );
};

export default SkeletonPost;
