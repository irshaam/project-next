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
  let tag = [];
  let tagTypes = [];
  let headers = {};

  if (session) {
    headers = { Authorization: `Bearer ${session.access_token}` };
  }

  try {
    const { data } = await client.get(`/tags/${context.params.id}`, { headers });
    tag = data;
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
      tag,
    }, // will be passed to the page component as props
  };
}

const TagsCreate = ({ tagTypes, tags, tag }: { tagTypes: any; tags: any; tag: any }) => {
  const [session] = useSession();
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    let headers = {};
    if (session) {
      headers = { Authorization: `Bearer ${session.access_token}` };

      const createTag = client.patch(`/tags/${tag.id}`, { ...values }, { headers });

      toast.promise(createTag, {
        loading: "Updating tag...",
        success: <b>Tag updated!</b>,
        error: <b>Could not save.</b>,
      });

      const response = await createTag;

      // Move to new page
      if (response.status === 200) {
        // router.push({
        //   pathname: "/tags",
        //   // query: { id: response.data.id },
        // });
        router.back();
      }
    }
  };

  return (
    <MainLayout>
      {/* !-- Page heading --> */}
      <div className="space-y-6 mt-4 px-10">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <CreateTagForm onSubmit={handleSubmit} mode="update" tagTypes={tagTypes} tags={tags} tag={tag} />
        </div>
      </div>{" "}
      <Toaster position="bottom-right" />
    </MainLayout>
  );
};

TagsCreate.auth = true;
export default TagsCreate;
