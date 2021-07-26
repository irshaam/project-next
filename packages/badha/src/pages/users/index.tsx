import { PencilIcon, CheckCircleIcon, ChevronRightIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";

import client from "../../api/client";
import { MainLayout } from "../../components";
import { imageLoader } from "../../utils";
export async function getServerSideProps(context: any) {
  const res = await fetch("http://localhost:5000/users");
  const users = await res.json();

  console.log(users);

  return {
    props: {
      users,
    }, // will be passed to the page component as props
  };
}

// import CreateMediaForm from "./form";
const UsersIndex = ({ users }: { user: any }) => {
  const submit = () => {
    const response = client.post("/users/create");
  };
  return (
    <MainLayout>
      {/* !-- Page heading --> */}

      <div className="space-y-6 mt-4 px-10">
        <main className="pt-8 pb-16 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="w-full mx-auto sm:px-6 lg:px-8">
            {/* <div className="max-w-7xl mx-auto sm:px-6 lg:px-8"> */}
            <div className="px-4 sm:px-0">
              <h2 className="text-lg font-medium text-gray-900">Users</h2>
              {/* Tabs */}

              <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex justify-between">
                    <div className="-mb-px flex space-x-8 " aria-label="Tabs">
                      {/* Current: "border-purple-500 text-purple-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200" */}
                    </div>
                    <div>
                      <Link href="/users/create" passHref>
                        <span className="hidden sm:block">
                          <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500"
                          >
                            <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                            Create
                          </button>
                        </span>
                      </Link>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
            {/* Stacked list */}
            <ul className="mt-5 border-t border-gray-200 divide-y divide-gray-200 sm:mt-0 sm:border-t-0" role="list">
              {users.map((user: any) => (
                <li key={user.uuiud}>
                  <Link href={`users/edit/${String(user.id)}`} key={`user_${user.uuiud}`}>
                    <a href="#" className="group block">
                      <div className="flex items-center py-5 px-4 sm:py-6 sm:px-0">
                        <div className="min-w-0 flex-1 flex items-center">
                          <div className="flex-shrink-0">
                            <Image
                              loader={imageLoader}
                              width={70}
                              height={70}
                              src={`${user.picture ? user.picture : "default"}`}
                              quality={100}
                              alt="Picture of the author"
                            />
                          </div>
                          <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                            <div>
                              <p className="text-sm font-medium text-purple-600 truncate">{user.name_en}</p>
                              <p className="mt-2 flex items-center text-sm text-gray-500">
                                {/* Heroicon name: solid/mail */}
                                <svg
                                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                <span className="truncate">{user.email}</span>
                              </p>
                            </div>
                            <div className="hidden md:block">
                              <div>
                                <p className="text-sm text-gray-900">
                                  Created on
                                  <time dateTime="2020-07-01T15:34:56">{user.createdAt}</time>
                                </p>
                                <p className="mt-2 flex items-center text-sm text-gray-500">
                                  <CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" />
                                  Active
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-700" />
                        </div>
                      </div>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
            {/* Pagination */}
          </div>
        </main>
      </div>
    </MainLayout>
  );
};
export default UsersIndex;
