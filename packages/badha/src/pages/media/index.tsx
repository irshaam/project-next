import { useAbility } from "@casl/react";
import { PencilIcon, ViewListIcon, ViewGridIcon, UploadIcon } from "@heroicons/react/solid";
import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useSWR from "swr";

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

const MediaIndex = (props: any) => {
  const [session] = useSession();
  const router = useRouter();
  const { tags } = props;
  const types = ["Collections", "Images", "Videos", "Documents"];

  const selectedType = "collections";
  const [showCollectionModal, setShowCollectionModal] = useState<boolean>(false);

  const { data, error } = useSWR(["/media?type=collections", session?.access_token], fetcher);

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
        pathname: `/media/collection/edit/${response.data.id}`,
      });
    }
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
                {/* Current: "border-purple-500 text-purple-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200" */}

                {types.map((type: string) => (
                  <Link key={`media_${type}}`} href={`/media?type=${type.toLowerCase()}`} passHref>
                    <a
                      href="#"
                      className={`border-transparent  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                        selectedType === type.toLowerCase()
                          ? "border-purple-500 text-purple-600"
                          : "text-gray-500 hover:text-gray-700 hover:border-gray-200"
                      }`}
                    >
                      {type}
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

          <section className="mt-8 pb-16 px-6" aria-labelledby="gallery-heading">
            <ul
              role="list"
              className="grid grid-cols- 2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-8 xl:gap-x-8"
              // className="grid grid-cols- 2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
            >
              {data &&
                data.data.map((item: any) => (
                  <CollectionItem
                    // currentItem={currentItem ? currentItem.id : ""}
                    // setCurrent={handleClick}
                    media={item}
                    key={`media_item_${item.id}`}
                  />
                ))}
            </ul>
          </section>
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

MediaIndex.auth = true;
export default MediaIndex;
