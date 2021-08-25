import { Dialog, Menu, Transition } from "@headlessui/react";
import { TrashIcon, PencilAltIcon } from "@heroicons/react/outline";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import filesize from "filesize";
import Image from "next/image";
import { Fragment, useState } from "react";

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
  onDelete(id: number): void;
}
export const MediaItem = ({ media, currentItem, setCurrent, onDelete }: Props) => {
  // const [showMenu, toggleMenu] = useState<boolean>(false);
  // const [session, loading] = useSession();

  const isActive = (id: number) => {
    return currentItem == id;
  };
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    setCurrent(Number(media.id));
  };

  return (
    <li className="relative cursor-pointer">
      {/* <li className="relative cursor-pointer" onClick={handleSubmit}> */}
      <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden relative">
        {/* <div className="flex px-3 py-2 items-center justify-between">
          <p className="block text-sm font-medium text-gray-500 pointer-events-none">
            {media.contentSize && filesize(Number(media.contentSize))}
          </p>
          <div className="flex items-center"> */}
        {/* <button
              className="border-transparent focus:outline-none"
              type="button"
              onClick={() => onDelete(Number(media.id))}
            >
              <PencilAltIcon className="h-5 w-5 mr-2  text-gray-400 hover:text-blue-400" />
            </button>
            <button
              className="border-transparent focus:outline-none"
              type="button"
              onClick={() => onDelete(Number(media.id))}
            >
              <TrashIcon className="h-5 w-5  text-gray-400 hover:text-red-next" />
            </button> */}

        {/* </div> */}
        {/* </div> */}
        {/* class="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100
        focus-within:ring-indigo-500 group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden" */}
        <div className="relative h-52">
          <div className="absolute top-4 right-2  z-30">
            {/* <Menu as="div" className="ml-3 relative inline-block text-left ">
              <div>
                <button
                  type="button"
                  onClick={(): void => setOpen(!open)}
                  className="-my-2 p-1 rounded-full bg-white bg-opacity-80 hover:bg-white flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <span className="sr-only">Open options</span>
                  <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className=" z-10 origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          className={classNames(
                            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                            "w-full flex justify-between px-4 py-2 text-sm"
                          )}
                        >
                          <span>Edit</span>
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                            "flex justify-between px-4 py-2 text-sm"
                          )}
                        >
                          <span>Delete</span>
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu> */}
          </div>

          <Image
            loader={imageLoader}
            layout="fill"
            objectFit="cover"
            src={`${media.path ? media.path : "default"}`}
            quality={75}
            alt={`Media object #${media.id}`}
          />
        </div>
      </div>
    </li>
  );
};

export default MediaItem;
