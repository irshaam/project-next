// eslint-disable-next-line import/order
import { getSession, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import CreateTagForm from "../form";

import client from "@/api/client";
import { MainLayout } from "@layouts";

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

const TagsCreate = ({ tagTypes, tags }: { tagTypes: any; tags: any }) => {
  const [session] = useSession();
  const [post, setPost] = useState<any>({});
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    let headers = {};
    if (session) {
      headers = { Authorization: `Bearer ${session.access_token}` };

      const createTag = client.post(`/tags`, { ...values }, { headers });

      toast.promise(createTag, {
        loading: "Creating new tag...",
        success: <b>Tag created!</b>,
        error: <b>Could not save.</b>,
      });

      const response = await createTag;

      // Move to new page
      if (response.status === 201) {
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
          <CreateTagForm onSubmit={handleSubmit} mode="create" tagTypes={tagTypes} tags={tags} />
        </div>
      </div>{" "}
      <Toaster position="bottom-right" />
    </MainLayout>
  );
};

TagsCreate.auth = true;
export default TagsCreate;
