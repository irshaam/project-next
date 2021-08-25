import { PhotographIcon, TrashIcon } from "@heroicons/react/outline";
import filesize from "filesize";
import Image from "next/image";
import { useRouter } from "next/router";

import { imageLoader, classNames } from "../../utils";

interface MediaItem {
  [x: string]: any;
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
  media: any;
  nameEn?: string;
}

interface Props {
  collection: MediaItem;
  currentItem?: number;
  setCurrent?(id: number): void;
  onDelete(id: number): void;
}
const CollectionItem = ({ collection, currentItem, setCurrent, onDelete }: Props) => {
  const router = useRouter();
  // const [showMenu, toggleMenu] = useState<boolean>(false);
  // const [session, loading] = useSession();

  const isActive = (id: number) => {
    return currentItem == id;
  };

  const handleSubmit = () => {
    router.push({
      pathname: `/media/collections/edit/${collection.id}`,
    });
  };

  return (
    <li className="relative cursor-pointer">
      <div
        className={classNames(
          isActive(Number(collection.id))
            ? "ring-2 ring-offset-2 ring-indigo-500"
            : "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500",
          "group block w-full aspect-w-10 aspect-h-7 rounded-lg border bg-white border-gray-200 shadow-md overflow-hidden h-full"
        )}
      >
        <div className="flex px-3 py-2 items-center justify-between">
          <div className="flex items-center">
            <PhotographIcon className="h-5 w-5 mr-2 text-gray-400" />
            {collection._count.media}
          </div>
          <div className="flex items-center">
            <button
              className="border-transparent focus:outline-none"
              type="button"
              onClick={() => onDelete(Number(collection.id))}
            >
              <TrashIcon className="h-5 w-5  text-gray-400 hover:text-red-next" />
            </button>
          </div>
        </div>
        <div onClick={handleSubmit}>
          {/* `${collection?.media.length > 0 ? collection.path : "empty-gallery.jpg"}` */}
          {collection.media && collection.media.length > 0 ? (
            <Image
              loader={imageLoader}
              width={512}
              height={512}
              src={collection?.media[0]?.path}
              quality={75}
              alt={`Media object #${collection.id}`}
              className={classNames(
                isActive(Number(collection.id)) ? "" : "group-hover:opacity-75 ",
                "object-cover pointer-events-none"
              )}
            />
          ) : (
            <Image
              loader={imageLoader}
              width={512}
              height={512}
              src={"empty-gallery.jpg"}
              quality={75}
              alt={`Media object #${collection.id}`}
              className={classNames(
                isActive(Number(collection.id)) ? "" : "group-hover:opacity-75 ",
                "object-cover pointer-events-none"
              )}
            />
          )}
          <div className="flex items-center px-3 py-2 text-sm -mt-1">{collection.nameEn}</div>
        </div>
        {/*
        <Image
          loader={imageLoader}
          width={512}
          height={512}
          src={`${collection?.media.length > 0 ? collection.path : "empty-gallery.jpg"}`}
          quality={100}
          alt={`Media object #${collection.id}`}
          className={classNames(
            isActive(Number(collection.id)) ? "" : "group-hover:opacity-75 ",
            "object-cover pointer-events-none"
          )}
        /> */}
      </div>
    </li>
  );
};

export default CollectionItem;
