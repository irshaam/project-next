/* eslint-disable @next/next/no-img-element */
import { Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/outline";
import { useSession, signIn, signOut } from "next-auth/client";
import Link from "next/link";
import { useState, Fragment } from "react";

import { SearchBar } from "../";
import BadhaLogo from "../../../images/badha-logo.svg";

export const Popover = (props: any) => {
  const [showMenu, toggleMenu] = useState<boolean>(false);
  const [session, loading] = useSession();

  return (
    <header className="bg-gray-800 shadow-sm lg:static lg:overflow-y-visible">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
          {/* Logo */}
          <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" passHref>
                <a href="#">
                  <BadhaLogo className="w-14 fill-current text-red-next hover:text-white cursor-pointer transition-colors duration-500 ease-in-out" />
                </a>
              </Link>
            </div>
          </div>

          {/* Search */}
          <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
            <SearchBar />
          </div>

          <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
            <a
              href="#"
              className="ml-5 flex-shrink-0 bg-gray-800 rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              <span className="sr-only">View notifications</span>
              {/* <!-- Heroicon name: outline/bell --> */}
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </a>

            {/* <!-- Profile dropdown --> */}
            <div className="flex-shrink-0 relative ml-5">
              <div>
                <button
                  type="button"
                  className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={(): void => toggleMenu(!showMenu)}
                >
                  <span className="sr-only">Open user menu</span>
                  {session && (
                    <img
                      className="h-8 w-8 rounded-full"
                      src={session.user?.image as string}
                      // src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixqx=0Void5L8Zb&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  )}
                </button>
              </div>

              <Transition
                show={showMenu}
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <div
                  className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
                  <a href="#" className="block py-2 px-4 text-sm text-gray-700" role="menuitem" id="user-menu-item-0">
                    Your Profile
                  </a>

                  <a href="#" className="block py-2 px-4 text-sm text-gray-700" role="menuitem" id="user-menu-item-1">
                    Settings
                  </a>
                  {session && (
                    <a
                      href="#"
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="block py-2 px-4 text-sm text-gray-700"
                      role="menuitem"
                      id="user-menu-item-2"
                    >
                      Sign out
                    </a>
                  )}
                </div>
              </Transition>
            </div>
            <Link href="/posts/create" passHref>
              <a
                href="#"
                className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
              >
                New Post
              </a>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
