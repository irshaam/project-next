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
}

interface Props {
  media: MediaItem;
  currentItem: number;
  setCurrent(id: number): void;
}
export const MediaItem = ({ media, currentItem, setCurrent }: Props) => {
  // const [showMenu, toggleMenu] = useState<boolean>(false);
  // const [session, loading] = useSession();

  const isActive = (id: number) => {
    return currentItem == id;
  };

  const handleSubmit = () => {
    setCurrent(Number(media.id));
  };

  return (
    <li className="relative cursor-pointer" onClick={handleSubmit}>
      <div
        className={classNames(
          isActive(Number(media.id))
            ? "ring-2 ring-offset-2 ring-indigo-500"
            : "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500",
          "group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden"
        )}
      >
        {/* class="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100
        focus-within:ring-indigo-500 group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden" */}
        <Image
          loader={imageLoader}
          width={512}
          height={512}
          src={`${media.path ? media.path : "default"}`}
          quality={100}
          alt={`Media object #${media.id}`}
          className={classNames(
            isActive(Number(media.id)) ? "" : "group-hover:opacity-75 ",
            "object-cover pointer-events-none"
          )}
        />
        {/* <button type="button" className="absolute bg-gray-600 w-full h-full inset-0 focus:outline-none">
          <span className="sr-only">View details for IMG_4985.HEIC</span>
        </button> */}
      </div>
      {/* <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">IMG_4985.HEIC</p> */}
      <p className="mt-2 block text-sm font-medium text-gray-500 pointer-events-none">
        {filesize(Number(media.contentSize))}
      </p>
    </li>
  );
};

export default MediaItem;
