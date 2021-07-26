import filesize from "filesize";
import Image from "next/image";

import { imageLoader, classNames } from "../../utils";

interface MediaItem {
  id: number | string;
  file?: string;
  original_filename?: string;
  path: string;
  contentSize: number | string;
  mimeType?: string;
  type?: string;
  caption?: string;
  captionEn?: string;
  hasWatermark?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  tags?: any;
}

interface Props {
  media: MediaItem;
}
const MediaSidebar = ({ media }: Props) => {
  // const [showMenu, toggleMenu] = useState<boolean>(false);
  // const [session, loading] = useSession();

  // const isActive = (id: number) => {
  //   return currentItem == id;
  // };

  // const handleSubmit = () => {
  //   setCurrent(Number(media.id));
  // };

  return (
    <aside className="hidden w-96 bg-white p-8 border-l border-gray-200 overflow-y-auto lg:block">
      <div className="pb-16 space-y-6">
        <div>
          <div className="block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
            <Image
              loader={imageLoader}
              width={512}
              height={512}
              src={`${media.path ? media.path : "default"}`}
              quality={100}
              alt={`Media object #${media.id}`}
              className="object-cover"
            />
          </div>
          <div className="mt-4 flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{filesize(Number(media.contentSize))}</p>
            </div>
            <button
              type="button"
              className="ml-4 bg-white rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {/* Heroicon name: outline/heart */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="sr-only">Favorite</span>
            </button>
          </div>
        </div>
        <div>
          <h3 className="font-medium text-gray-900">Information</h3>
          <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
            <div className="py-3 flex justify-between text-sm font-medium">
              <dt className="text-gray-500">Uploaded by</dt>
              <dd className="text-gray-900">user</dd>
            </div>
            <div className="py-3 flex justify-between text-sm font-medium">
              <dt className="text-gray-500">Created</dt>
              <dd className="text-gray-900">{media.createdAt}</dd>
            </div>
            <div className="py-3 flex justify-between text-sm font-medium">
              <dt className="text-gray-500">Last modified</dt>
              <dd className="text-gray-900">{media.updatedAt}</dd>
            </div>
            <div className="py-3 flex justify-between text-sm font-medium">
              <dt className="text-gray-500">Tags</dt>
              <dd className="text-gray-900">{media.tags.map((tag: any) => tag.name).join(",")}</dd>
            </div>
          </dl>
        </div>
        {media.caption && (
          <div>
            <h3 className="font-medium text-gray-900">Caption</h3>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm text-gray-500 italic">{media.caption}</p>
            </div>
          </div>
        )}
        {media.captionEn && (
          <div>
            <h3 className="font-medium text-gray-900">Caption En</h3>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm text-gray-500 italic">{media.captionEn}</p>
            </div>
          </div>
        )}

        <div className="flex">
          <button
            type="button"
            className="flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Download
          </button>
          <button
            type="button"
            className="flex-1 ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Delete
          </button>
        </div>
      </div>
    </aside>
    // <li className="relative cursor-pointer" onClick={handleSubmit}>
    //   <div
    //     className={classNames(
    //       isActive(Number(media.id))
    //         ? "ring-2 ring-offset-2 ring-indigo-500"
    //         : "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500",
    //       "group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden"
    //     )}
    //   >
    //     {/* class="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100
    //     focus-within:ring-indigo-500 group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden" */}
    //     <Image
    //       loader={imageLoader}
    //       width={512}
    //       height={512}
    //       src={`${media.path ? media.path : "default"}`}
    //       quality={100}
    //       alt={`Media object #${media.id}`}
    //       className={classNames(
    //         isActive(Number(media.id)) ? "" : "group-hover:opacity-75 ",
    //         "object-cover pointer-events-none"
    //       )}
    //     />
    //     {/* <button type="button" className="absolute bg-gray-600 w-full h-full inset-0 focus:outline-none">
    //       <span className="sr-only">View details for IMG_4985.HEIC</span>
    //     </button> */}
    //   </div>
    //   {/* <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">IMG_4985.HEIC</p> */}
    //   <p className="mt-2 block text-sm font-medium text-gray-500 pointer-events-none">
    //     {filesize(Number(media.contentSize))}
    //   </p>
    // </li>
  );
};

export default MediaSidebar;
