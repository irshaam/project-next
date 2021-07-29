import { PencilIcon } from "@heroicons/react/solid";
import { format } from "date-fns";
import Link from "next/link";

import client from "../../api/client";
import { MainLayout } from "../../components";

import { getPosts } from "@/api";
export async function getServerSideProps(context: any) {
  const tabs = ["draft", "review", "rejected", "approved", "scheduled", "published", "unpublished", "archived"];

  const posts = await getPosts();

  return {
    props: {
      tabs,
      posts,
    }, // will be passed to the page component as props
  };
}

// import CreateMediaForm from "./form";
const UserCreate = ({ tabs, posts }: { tabs: any; posts: any }) => {
  return (
    <MainLayout>
      {/* !-- Page heading --> */}

      <div className="space-y-6 mt-4 px-10">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div>
            <div className="hidden sm:block flex  justify-between">
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
                    {tabs.map((tab, idx) => (
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
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Heading
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Slug
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
                      {posts.map((post: any, idx: any) => (
                        <tr className={idx % 2 == 0 ? "bg-white" : "bg-gray-50"} key={`post_${post.id}`}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.heading}</td>
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
                            {format(new Date(post.updatedAt), "dd-mm-yyyy")}
                          </td>
                          {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {post.parent ? post.parent : "-"}
                          </td> */}
                          {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.tagType.name}</td> */}
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-4">
                              Edit
                            </a>
                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                              Delete
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
export default UserCreate;
