import AsideUsers from "@/components/aside-users/AsideUsers";
import Header from "@/components/header/Header";
import Post from "@/components/post/Post";
import { useGetFeedQuery } from "@/redux/api/user-api";
import { FC } from "react";

const Home: FC = () => {
  const { data: feedData } = useGetFeedQuery({ limit: 10 });
  console.log(feedData);

  return (
    <>
      <h1 className="sr-only">Home feed</h1>
      <div className="flex">
        <div className="flex flex-col w-full h-full font-inter text-white">
          <Header />
          <main className="w-full bg-aside px-14 overflow-auto h-full">
            <div>
              <h2 className="text-3xl font-bold my-10">Home Feed</h2>
            </div>
            <div className="px-4 py-2 bg-[#09090A] w-full h-full rounded-3xl border border-[#1F1F22]">
              <Post data={feedData?.posts} />
            </div>
          </main>
        </div>
        <AsideUsers />
      </div>
    </>
  );
};

export default Home;
