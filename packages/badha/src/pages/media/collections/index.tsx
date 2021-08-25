import { useAbility } from "@casl/react";
import { PencilIcon, ViewListIcon, ViewGridIcon, UploadIcon } from "@heroicons/react/solid";
import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/client";
import { route } from "next/dist/next-server/server/router";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import useSWR, { mutate } from "swr";

import { AbilityContext } from "../../components/auth/can";

import AddMediaCollectionModal from "./add-collection-modal";

import client from "@/api/client";
import CollectionItem from "@/components/media/collection-item";
import { MainLayout } from "@layouts";

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  // const users = await getUsers();
  let tags = [];
  let headers = {};

  if (session) {
    headers = { Authorization: `Bearer ${session.access_token}` };
  }

  try {
    const { data } = await client.get("/tags", { headers: headers });
    tags = data;
  } catch (e) {
    return {
      // redirect: {
      //   destination: "/unauthorized",
      //   permanent: false,
      // },
    };
  }

  return {
    props: {
      tags,
    }, // will be passed to the page component as props
  };
}

const fetcher = (url: string, token: string) =>
  client.get(url, { headers: { Authorization: "Bearer " + token } }).then((res: any) => res.data);
// axios.get(url, { headers: { Authorization: "Bearer " + token } }).then((res) => res.data);

const MediaCollectionIndex = (props: any) => {
  const [session] = useSession();
  const router = useRouter();
  const [pageIndex, setPageIndex] = useState(1);
  const [perPage, setPerPage] = useState(12);

  const { tags } = props;
  const { query } = router;
  const tabs = [
    { name: "Images", slug: "image" },
    { name: "Videos", slug: "video" },
    { name: "Audio", slug: "audio" },
    { name: "Documents", slug: "documents" },
  ];
  const selectedType = "collections";
  const [showCollectionModal, setShowCollectionModal] = useState<boolean>(false);

  useEffect(() => {
    setPageIndex(Number(query.page));
  }, [query]);
  const { data, error } = useSWR([`/media/collections?page=${pageIndex}`, session?.access_token], fetcher);

  console.log(data);
  /**
   * Create Collection
   * @param values Collection Values
   */
  const handleSubmit = async (values: any) => {
    const createCollection = client.post(
      `/media/collection`,
      { ...values },
      { headers: { Authorization: `Bearer ${session?.access_token}` } }
    );

    toast.promise(createCollection, {
      loading: "Creating new collection...",
      success: <b>Collection created!</b>,
      error: <b>Could not save.</b>,
    });

    const response = await createCollection;

    // Move to new page
    if (response.status === 201) {
      router.push({
        pathname: `/media/collections/edit/${response.data.id}`,
      });
    }
  };

  const handleDelete = async (id: number) => {
    const deleteCollection = client.delete(`/media/collection/${id}`, {
      headers: { Authorization: `Bearer ${session?.access_token}` },
    });

    toast.promise(deleteCollection, {
      loading: "Deleting collection...",
      success: <b>Collection deleted!</b>,
      // eslint-disable-next-line react/display-name
      error: (err: any) => <b>{err.response.data.message}</b>,
    });

    const response = await deleteCollection;

    mutate([`/media/collections?page=${pageIndex}`, session?.access_token]);
  };

  return (
    <MainLayout>
      <div className="space-y-6 mt-4 px-10">
        <main className="pt-8 bg-white shadow py-5 sm:rounded-lg">
          <div className="px-6">
            <h1 className="text-lg leading-6 font-medium text-gray-900">Media Manager</h1>
          </div>

          {/* SOF NAV */}
          <div className="border-b border-gray-200 px-6">
            <nav className="-mb-px flex justify-between">
              <div className="-mb-px flex space-x-8 " aria-label="Tabs">
                {/* Current: "", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200" */}
                <Link key="tab_collection" href="/media/collections" passHref>
                  <a
                    href="#"
                    className="border-transparent  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm  border-purple-500 text-purple-600"
                  >
                    Collections
                  </a>
                </Link>
                {tabs.map((tab: any, idx: number) => (
                  <Link key={`tab_${idx}`} href={`/media?type=${tab.slug}`} passHref>
                    <a className="border-transparent  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-200">
                      {tab.name}
                    </a>
                  </Link>
                ))}
              </div>

              <div className="flex just-center items-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowCollectionModal(true);
                  }}
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500"
                >
                  <PencilIcon className=" mr-2 h-5 w-5 text-gray-400" />
                  Create Collection
                </button>

                <Link href="/media/create" passHref>
                  <button
                    type="button"
                    className=" ml-2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500"
                  >
                    <UploadIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                    Quick Upload
                  </button>
                </Link>
              </div>
            </nav>
          </div>
          {/* EOF TABS */}
          {data && (
            <section className="mt-8 pb-16 px-6" aria-labelledby="gallery-heading">
              <ul
                role="list"
                // className="grid grid-cols- 2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                className="grid grid-cols- 2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-8"
              >
                {data &&
                  data.data.map((item: any, idx: any) => (
                    <CollectionItem
                      onDelete={handleDelete}
                      // currentItem={currentItem ? currentItem.id : ""}
                      // setCurrent={handleClick}
                      collection={item}
                      key={`collection_item_${item.id}`}
                    />
                  ))}
              </ul>
            </section>
          )}
          {/* pagination */}
          {data && (
            <nav className="border-t border-gray-200 px-6 flex items-center justify-between " aria-label="Pagination">
              <div className="-mt-px w-0 flex-1 flex">
                {pageIndex <= data.totalPages && pageIndex != 1 && (
                  <Link href={{ pathname: "/media/collections", query: { page: pageIndex - 1 } }}>
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
                  <Link key={page} href={{ pathname: "/media/collections", query: { page: page + 1 } }}>
                    <a
                      href="#"
                      className={`border-transparent border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium ${
                        page + 1 === pageIndex
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
                {pageIndex != data.totalPages && (
                  <Link href={{ pathname: "/posts", query: { page: pageIndex + 1 } }}>
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
          )}
        </main>
      </div>

      {/* Media Collection Create Modal */}
      <AddMediaCollectionModal
        tags={tags}
        open={showCollectionModal}
        onSubmit={handleSubmit}
        onClose={(): void => setShowCollectionModal(!showCollectionModal)}
      />

      <Toaster position="bottom-right" />
    </MainLayout>
  );
};

MediaCollectionIndex.auth = true;
export default MediaCollectionIndex;
