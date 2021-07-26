import { PencilIcon } from "@heroicons/react/solid";
import Link from "next/link";

import client from "../../api/client";
import { MainLayout } from "../../components";

export async function getServerSideProps(context: any) {
  const res = await fetch("http://localhost:5000/tag-types");
  const types = await res.json();

  // console.log(types);

  //  get tag types
  const tagsReponse = await fetch("http://localhost:5000/tags");
  const tags = await tagsReponse.json();

  return {
    props: {
      types,
      tags,
    }, // will be passed to the page component as props
  };
}

// import CreateMediaForm from "./form";
const UserCreate = ({ types, tags }: { types: any; tags: any }) => {
  const submit = () => {
    const response = client.post("/users/create");
  };
  return (
    <MainLayout>
      {/* !-- Page heading --> */}

      <div className="space-y-6 mt-4 px-10">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div>
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              <select
                id="tabs"
                name="tabs"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option>Applied</option>
                <option>Phone Screening</option>
                <option selected>Interview</option>
                <option>Offer</option>
                <option>Disqualified</option>
              </select>
            </div>
            <div className="hidden sm:block flex  justify-between">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex justify-between">
                  {/* Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200" */}
                  <div className="-mb-px flex space-x-8 " aria-label="Tabs">
                    <a
                      href="#"
                      className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
                    >
                      All
                      {/* Current: "bg-indigo-100 text-indigo-600", Default: "bg-gray-100 text-gray-900" */}
                      <span className="bg-gray-100 text-gray-900 hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block">
                        52
                      </span>
                    </a>
                    <a
                      href="#"
                      className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
                    >
                      Drafts
                      <span className="bg-gray-100 text-gray-900 hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block">
                        6
                      </span>
                    </a>
                    <a
                      href="#"
                      className="border-indigo-500 text-indigo-600 whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
                      aria-current="page"
                    >
                      Review
                      <span className="bg-indigo-100 text-indigo-600 hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block">
                        4
                      </span>
                    </a>
                    <a
                      href="#"
                      className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
                    >
                      Scheduled
                    </a>
                    <a
                      href="#"
                      className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
                    >
                      Published
                    </a>
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
        </div>
      </div>
    </MainLayout>
  );
};
export default UserCreate;
