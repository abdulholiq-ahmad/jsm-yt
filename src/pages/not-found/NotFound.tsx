import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center bg-[#09090A] min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-white text-4xl font-bold tracking-tighter sm:text-5xl">Oops! Lost in Cyberspace</h1>
          <p className="text-gray-500">Looks like you've ventured into the unknown digital realm.</p>
        </div>
        <Link
          to={"/"}
          className="inline-flex h-10 items-center rounded-md bg- px-8 text-sm font-medium bg-[#877EFF] text-gray-50 shadow transition-colors hover:bg-[#877EFF]/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
        >
          Return to website
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
