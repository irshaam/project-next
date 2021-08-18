import { PencilIcon } from "@heroicons/react/solid";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import Link from "next/link";

import client from "../../api/client";
import { MainLayout } from "../../components";

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const session = await getSession({ req });
  const tabs = ["draft", "review", "rejected", "approved", "scheduled", "published", "unpublished", "archived"];

  const currentPage = query.page || 1;
  console.log(currentPage);
  // const users = await getUsers();
  let data = {};
  let headers = {};

  if (session) {
    headers = { Authorization: `Bearer ${session.access_token}` };
  }
  try {
    const response = await client.get("/posts", { params: { page: currentPage }, headers });
    data = response.data;
  } catch (e) {
    console.log(e);

    return {
      redirect: {
        destination: "/unauthorized",
        permanent: false,
      },
    };
  }

  return {
    props: {
      data,
      tabs,
    },
  };
};

// import CreateMediaForm from "./form";
const PostIndex = ({ tabs, data }: { tabs: any; data: any }) => {
  return (
    <MainLayout>
      {/* !-- Page heading --> */}
      <div className="space-y-6 mt-4 px-10">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div>
            <div className="sm:block flex  justify-between">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex justify-between">
                  {/* Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200" */}
                  <div className="-mb-px flex space-x-8 " aria-label="Tabs">
                    <a
                      href="#"
                      className=" border-indigo-500  text-indigo-500 hover:text-indigo-600 hover:border-gray-200 whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
                    >
                      All
                      {/* <span className="bg-indigo-100 text-indigo-600 hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block">
                        52
                      </span> */}
                    </a>
                    {tabs.map((tab: any, idx: any) => (
                      <a
                        key={`tab_type_${idx}`}
                        // className="border-indigo-500 text-indigo-600 whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
                        href="#"
                        className=" capitalize border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
                      >
                        {tab}
                        {/* <span className="bg-gray-100 text-gray-900 hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block">
                          6
                        </span> */}
                      </a>
                    ))}
                  </div>
                  <div>
                    <Link href="/posts/create" passHref>
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

          {/* here goes the list  */}
          <div className="flex flex-col mt-2 mb-8">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div>
                  {/* <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"> */}
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider "
                        >
                          Heading
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Authors
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Created Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Last Updated
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.posts?.map((post: any, idx: any) => (
                        <tr className={idx % 2 == 0 ? "bg-white" : "bg-gray-50"} key={`post_${post.id}`}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mv-typewriter-bold tracking-normal text-md">
                            {post.headingDetailed}
                          </td>
                          <td className="text-left">
                            <li className="list-none text-xs">
                              {post.authors?.map((author: any) => (
                                <li key={`author${author.id_}`}>{author.nameEn}</li>
                              ))}
                            </li>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.status}</td>
                          <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {post.category ? (
                              post.category.name
                            ) : (
                              <span className="bg-yellow-400 text-white text-xs px-2 py-1">No Category </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {format(new Date(post.createdAt), "dd-MM-yyyy")}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {format(new Date(post.updatedAt), "dd-MM-yyyy (hh:mm)")}
                          </td>
                          {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {post.parent ? post.parent : "-"}
                          </td> */}
                          {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.tagType.name}</td> */}
                          <td>
                            <div>
                              {post.tags.length > 0 ? (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                  <svg className="mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
                                    <circle cx={4} cy={4} r={3} />
                                  </svg>
                                  #{post.tags.length} Tags attached
                                </span>
                              ) : (
                                <div>
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-yellow-800">
                                    <svg
                                      className="mr-1.5 h-2 w-2 text-yellow-400"
                                      fill="currentColor"
                                      viewBox="0 0 8 8"
                                    >
                                      <circle cx={4} cy={4} r={3} />
                                    </svg>
                                    No tags
                                  </span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link href={`posts/edit/${String(post.nanoid)}`} key={`post_${post.nanoid}`}>
                              <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-4">
                                Edit
                              </a>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <nav
                    className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0"
                    aria-label="Pagination"
                  >
                    <div className="-mt-px w-0 flex-1 flex">
                      {data.currentPage <= data.totalPages && data.currentPage != 1 && (
                        <Link href={{ pathname: "/posts", query: { page: data.currentPage - 1 } }}>
                          <a
                            href="#"
                            className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-200"
                          >
                            {/* Heroicon name: solid/arrow-narrow-left */}
                            <svg
                              className="mr-3 h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Previous
                          </a>
                        </Link>
                      )}
                    </div>
                    <div className="hidden md:-mt-px md:flex">
                      {[...Array(data.totalPages).keys()].map((page: any) => (
                        <Link key={page} href={{ pathname: "/posts", query: { page: page + 1 } }}>
                          <a
                            href="#"
                            className={`border-transparent border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium ${
                              page + 1 === data.currentPage
                                ? "border-purple-500 text-purple-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200"
                            }`}
                          >
                            {page + 1}
                          </a>
                        </Link>
                      ))}
                    </div>
                    <div className="-mt-px w-0 flex-1 flex justify-end">
                      {data.currentPage != data.totalPages && (
                        <Link href={{ pathname: "/posts", query: { page: data.currentPage + 1 } }}>
                          <a
                            href="#"
                            className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-200"
                          >
                            Next
                            {/* Heroicon name: solid/arrow-narrow-right */}
                            <svg
                              className="ml-3 h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </a>
                        </Link>
                      )}
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

PostIndex.auth = true;
export default PostIndex;
