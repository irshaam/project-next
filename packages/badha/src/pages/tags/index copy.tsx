import { PencilIcon } from "@heroicons/react/solid";
import { getSession } from "next-auth/client";
import Link from "next/link";

import { MainLayout } from "../../components";

import client from "@/api/client";

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const tabs = ["draft", "review", "rejected", "approved", "scheduled", "published", "unpublished", "archived"];

  // const users = await getUsers();
  let tags = [];
  let tagTypes = [];
  let headers = {};

  if (session) {
    headers = { Authorization: `Bearer ${session.access_token}` };
  }

  try {
    const { data } = await client.get("/tags", { headers });
    tags = data;
  } catch (e) {
    console.log(e);

    return {};
  }
  try {
    const { data } = await client.get("/tag-types", { headers });
    tagTypes = data;
  } catch (e) {
    console.log(e);

    return {};
  }

  return {
    props: {
      tags,
      tagTypes,
    }, // will be passed to the page component as props
  };
}
// import CreateMediaForm from "./form";
const TagsIndex = ({ tagTypes, tags }: { tagTypes: any; tags: any }) => {
  // const submit = () => {
  //   const response = client.post("/users/create");
  // };
  return (
    <MainLayout>
      {/* !-- Page heading --> */}

      <div className="space-y-6 mt-4 px-10">
        <main className="pt-8 pb-16 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="w-full mx-auto">
            {/* <div className="max-w-7xl mx-auto sm:px-6 lg:px-8"> */}
            <div className="px-4 sm:px-0">
              <h2 className="text-lg font-medium text-gray-900">Tags</h2>
              {/* Tabs */}

              <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex justify-between">
                    <div className="-mb-px flex space-x-8 " aria-label="Tabs">
                      {/* Current: "border-purple-500 text-purple-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200" */}

                      <a
                        href="#"
                        className="border-purple-500 text-purple-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                      >
                        All
                      </a>

                      {/* {tagTypes.map((tagType: any) => (
                        <a
                          key={`tag_types_${tagType.id}`}
                          href="#"
                          className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                        >
                          {tagType.name}
                        </a>
                      ))} */}
                    </div>
                    <div>
                      <Link href="/tags/create" passHref>
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
            {/* This example requires Tailwind CSS v2.0+ */}
            <div className="flex flex-col mt-2 mb-8">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Name En
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Slug
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Parent
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Type
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tags.map((tag: any, idx: any) => (
                          <tr className={idx % 2 == 0 ? "bg-white" : "bg-gray-50"} key={`taga_type_${tag.id}`}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tag.nameEn}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-600 font-mv-typewriter-bold tracking-normal text-md">
                              {tag.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tag.slug}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {tags.parent ? tags.parent : "-"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tag.tagType.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link href={`tags/edit/${String(tag.id)}`} key={`tag_${tag.id}`}>
                                <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-4">
                                  Edit
                                </a>
                              </Link>
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

            {/* Stacked list */}
          </div>
        </main>
      </div>
    </MainLayout>
  );
};

TagsIndex.auth = true;
export default TagsIndex;
