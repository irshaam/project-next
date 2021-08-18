import { ChevronLeftIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
const PostNav = (props: any) => {
  const router = useRouter();

  return (
    <div className="absolute top-4 left-20 flex ">
      <button
        type="button"
        onClick={() => router.back()}
        className="w-30 justify-start cursor-pointer text-rose-800 hover:text-gray-900 mr-2 py-1"
      >
        <div className="text-sm flex items-center ">
          <ChevronLeftIcon className=" fill-current w-5 h-5" />
          Posts
        </div>
      </button>

      <div className=" capitalize text-sm flex items-center px-4 w-30 justify-start cursor-pointer text-gray-400 border-l h-full ml-2 py-1 border-gray-300">
        {props.status ? props.status : "Draft"}
      </div>
    </div>
  );
};
export default PostNav;
