import { Skeleton } from "../ui/skeleton";

const SkeletonUsers = () => {
  return (
    <div className="flex flex-col space-y-3 p-6">
      <Skeleton className="h-10 w-[60px] rounded-xl mx-auto" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[120px] mx-auto" />
        <Skeleton className="h-4 w-[120px] mx-auto" />
        <Skeleton className="h-9 w-[75px] mx-auto" />
      </div>
    </div>
  );
};

export default SkeletonUsers;
