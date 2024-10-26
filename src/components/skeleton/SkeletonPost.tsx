import { FC } from "react";
import { Skeleton } from "../ui/skeleton";

const SkeletonPost: FC = () => {
  return (
    <div className="py-9 px-11 border rounded-3xl border-[#1F1F22]">
      <div className="flex items-center space-x-2">
        <Skeleton className="h-14 w-14 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-[150px]" />
          <Skeleton className="h-3 w-[100px]" />
        </div>
      </div>

      <div className="my-4">
        <Skeleton className="h-3 w-full" />
      </div>

      <div className="my-4">
        <Skeleton className="h-[400px] w-full" />
      </div>

      <div className="flex gap-3 items-center">
        <div className="my-4">
          <Skeleton className="h-8 w-8" />
        </div>

        <div className="my-4">
          <Skeleton className="h-8 w-8" />
        </div>

        <div className="my-4">
          <Skeleton className="h-8 w-8" />
        </div>

        <div className="my-4 ml-auto">
          <Skeleton className="h-8 w-8" />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Skeleton className="h-14 w-14 rounded-full" />
        <div className="space-y-2 w-full">
          <Skeleton className="h-5 w-full" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonPost;
