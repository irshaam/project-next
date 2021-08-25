// eslint-disable-next-line import/order
import { getSession, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

import CreateTagForm from "../form";

import client from "@/api/client";
import { MainLayout } from "@layouts";

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  // const users = await getUsers();
  let tags = [];
  let collection = {};
  let headers = {};

  if (session) {
    headers = { Authorization: `Bearer ${session.access_token}` };
  }

  try {
    const { data } = await client.get(`/media/collection/${context.params.id}`, { headers });
    collection = data;
  } catch (e) {
    console.log(e);

    return {};
  }
  try {
    const { data } = await client.get("/tags", { headers });
    tags = data;
  } catch (e) {
    console.log(e);

    return {};
  }

  // try {
  //   const { data } = await client.get("/tag-types", { headers });
  //   tagTypes = data;
  // } catch (e) {
  //   console.log(e);

  //   return {};
  // }

  return {
    props: {
      collection,
      tags,
    }, // will be passed to the page component as props
  };
}

const EditCollection = (props: any, { tags, collection }: { tags: any; collection: any }) => {
  const [session] = useSession();
  const router = useRouter();

  console.log(props);

  const handleSubmit = async (values: any) => {
    let headers = {};
    if (session) {
      headers = { Authorization: `Bearer ${session.access_token}` };

      const createTag = client.patch(`/tags/${collection.id}`, { ...values }, { headers });

      toast.promise(createTag, {
        loading: "Updating tag...",
        success: <b>Tag updated!</b>,
        error: <b>Could not save.</b>,
      });

      const response = await createTag;

      // Move to new page
      if (response.status === 200) {
        router.push({
          pathname: "/tags",
          // query: { id: response.data.id },
        });
      }
    }
  };

  return (
    <MainLayout>
      {/* !-- Page heading --> */}
      <div className="space-y-6 mt-4 px-10">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          {/* <CreateTagForm onSubmit={handleSubmit} mode="update" tags={tags} collection={collection} /> */}
        </div>
      </div>{" "}
      <Toaster position="bottom-right" />
    </MainLayout>
  );
};

EditCollection.auth = true;
export default EditCollection;
