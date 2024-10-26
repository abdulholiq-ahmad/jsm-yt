import { FC, useEffect, useRef, useState } from "react";
import { useGetFeedQuery } from "@/redux/api/user-api";
import AsideUsers from "@/components/aside-users/AsideUsers";
import Header from "@/components/header/Header";
import Post from "@/components/post/Post";
import { CgSortAz } from "react-icons/cg";
import { PostData } from "@/types";
import SkeletonPost from "@/components/skeleton/SkeletonPost";

const Home: FC = () => {
  const [limit, setLimit] = useState(5);
  const { data: feedData, refetch, isFetching } = useGetFeedQuery({ limit });
  const observerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const loadMorePosts = () => {
    if (loading || !feedData) return;
    setLoading(true);
    setLimit((prev) => prev + limit);
  };

  useEffect(() => {
    if (feedData && feedData.posts) {
      setLoading(false);
    }
  }, [feedData]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && feedData?.posts.length > limit) {
        loadMorePosts();
      }
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [observerRef, feedData]);

  const SkeletonItem = Array.from({ length: 1 }, (_, index) => <SkeletonPost key={index} />);

  return (
    <>
      <h1 className="sr-only">Home feed</h1>
      <div className="flex">
        <div className="flex flex-col w-full h-full font-inter text-white">
          <Header />
          <main className="w-full bg-aside px-14 overflow-auto h-full">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold my-10">Home Feed</h2>
              <button className="capitalize flex items-center gap-1 rounded-md bg-[#101012] hover:bg-[#1F1F22] transition-all duration-100 ease-in py-3 px-4">
                All
                <CgSortAz className="size-6 text-[#5C5C7B]" />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                {feedData?.posts?.map((post: PostData, index: number) => (
                  <div
                    key={post._id}
                    className="px-4 py-2 bg-[#09090A] w-full rounded-3xl border border-[#1F1F22]"
                    ref={index === feedData.posts.length - 1 ? observerRef : null}
                  >
                    <Post data={post} refetch={refetch} />
                  </div>
                ))}
                {(isFetching || loading) && SkeletonItem}
              </div>
            </div>
          </main>
        </div>
        <AsideUsers />
      </div>
    </>
  );
};

export default Home;
