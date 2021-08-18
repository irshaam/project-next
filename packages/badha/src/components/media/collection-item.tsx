import { PhotographIcon } from "@heroicons/react/outline";
import filesize from "filesize";
import Image from "next/image";
import { useRouter } from "next/router";

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
  _count?: any;
  nameEn?: string;
}

interface Props {
  media: MediaItem;
  currentItem: number;
  setCurrent(id: number): void;
}
const CollectionItem = ({ media, currentItem, setCurrent }: Props) => {
  const router = useRouter();
  // const [showMenu, toggleMenu] = useState<boolean>(false);
  // const [session, loading] = useSession();

  const isActive = (id: number) => {
    return currentItem == id;
  };

  const handleSubmit = () => {
    router.push({
      pathname: `/media/collection/edit/${media.id}`,
    });
  };

  return (
    <li className="relative cursor-pointer" onClick={handleSubmit}>
      <div
        className={classNames(
          isActive(Number(media.id))
            ? "ring-2 ring-offset-2 ring-indigo-500"
            : "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500",
          "group block w-full aspect-w-10 aspect-h-7 rounded-lg border bg-white border-gray-200 shadow-md overflow-hidden h-full"
        )}
      >
        <div className="flex px-3 py-2">
          <div className="flex items-center">
            <PhotographIcon className="h-5 w-5 mr-2 text-gray-400" />
            {media._count.media}
          </div>
        </div>

        <Image
          loader={imageLoader}
          width={512}
          height={512}
          src={`${media.path ? media.path : "empty-gallery.jpg"}`}
          quality={100}
          alt={`Media object #${media.id}`}
          className={classNames(
            isActive(Number(media.id)) ? "" : "group-hover:opacity-75 ",
            "object-cover pointer-events-none"
          )}
        />

        <div className="flex items-center px-3 py-2 text-sm -mt-1">
          {media.nameEn} {media.nameEn}
          {media.nameEn}
        </div>
      </div>
    </li>
  );
};

export default CollectionItem;
