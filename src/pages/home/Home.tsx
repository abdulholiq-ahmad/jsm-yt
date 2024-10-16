import AsideUsers from "@/components/aside-users/AsideUsers";
import Header from "@/components/header/Header";

const Home = () => {
  return (
    <>
      <h1 className="sr-only">Home feed</h1>
      <div className="flex flex-col w-full font-inter text-white overflow-hidden">
        <Header />
        <main className="w-full bg-aside h-full px-14">
          <div>
            <h2 className="text-3xl font-bold my-10">Home Feed</h2>
          </div>
          <div className="px-4 py-2 bg-[#09090A] w-full h-full rounded-3xl border border-[#1F1F22]"></div>
        </main>
      </div>
      <AsideUsers />
    </>
  );
};

export default Home;
