import { FC, useEffect, useRef, useState } from "react";
import { useGetFeedQuery } from "@/redux/api/user-api";
import AsideUsers from "@/components/aside-users/AsideUsers";
import Header from "@/components/header/Header";
import Post from "@/components/post/Post";
import { CgSortAz } from "react-icons/cg";
import { PostData } from "@/types";

const Home: FC = () => {
  const [limit, setLimit] = useState(20); // Initial limit for posts
  const { data: feedData, refetch } = useGetFeedQuery({ limit });
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [loading, setLoading] = useState(false);

  const loadMorePosts = () => {
    if (loading) return;
    setLoading(true);
    setLimit((prev) => prev + 20);
  };

  useEffect(() => {
    if (!feedData || !feedData.posts) return;

    setLoading(false);
  }, [feedData]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
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
                <CgSortAz className="size-8 text-[#5C5C7B]" />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {feedData?.posts?.map((post: PostData, index: number) => (
                <div
                  key={post._id}
                  className="px-4 py-2 bg-[#09090A] w-full rounded-3xl border border-[#1F1F22]"
                  ref={index === feedData.posts.length - 1 ? observerRef : null} // Set ref for last item
                >
                  <Post data={post} />
                </div>
              ))}
            </div>
            {loading && <p className="text-center text-gray-500">Loading more posts...</p>} {/* Loading indicator */}
          </main>
        </div>
        <AsideUsers />
      </div>
    </>
  );
};

export default Home;
