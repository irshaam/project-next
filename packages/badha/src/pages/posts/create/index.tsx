import { getSession, useSession } from "next-auth/client";
import router, { useRouter } from "next/router";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import client from "../../../api/client";
import EditorLayout from "../../../components/layouts/EditorLayout";
import CreatePostForm from "../form";
import PostNav from "../post-nav";

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const tabs = ["draft", "review", "rejected", "approved", "scheduled", "published", "unpublished", "archived"];

  // const users = await getUsers();
  let tags = [];
  let authors = [];
  let types = [];
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
    const { data } = await client.get("/users/authors", { headers });
    authors = data;
  } catch (e) {
    console.log(e);

    return {};
  }

  return {
    props: {
      tags,
      authors,
    }, // will be passed to the page component as props
  };
}

const CreatePost = ({ tags, authors }: { tags: any; authors: any }) => {
  const [session] = useSession();
  const [post, setPost] = useState<any>({});
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    let headers = {};
    if (session) {
      headers = { Authorization: `Bearer ${session.access_token}` };
    }
    // const formData = new FormData();

    // for (let key in values) {
    //   formData.append(key, values[key]);
    // }
    const createPost = client.post(`/posts`, { ...values }, { headers });

    toast.promise(createPost, {
      loading: "Creating new post...",
      success: <b>Post saved!</b>,
      error: <b>Could not save.</b>,
    });

    const response = await createPost;

    // Move to new page
    if (response.status === 201) {
      router.push({
        pathname: "/posts/edit/[id]",
        query: { id: response.data.nanoid },
      });
    }

    // try {
    //   await client.post(`/posts`, formData, { headers });
    //   toast("Successfully created a new Article!");
    // } catch (e) {
    //   if (e.response.status) {
    //     switch (e.response.status) {
    //       case 409:
    //         toast.error(`${e.response.statusText}[${e.response.status}]`);
    //         break;

    //       default:
    //         break;
    //     }
    //   }
    //   console.log(e.response);
    // }
  };
  return (
    <EditorLayout>
      <PostNav status={post.status} />
      {/* !-- Page heading --> */}
      <div className="space-y-6 mt-4 px-10">
        <div className="bg-primary  px-4 py-5 sm:p-6">
          <CreatePostForm
            onSubmit={handleSubmit}
            authors={authors}
            tags={tags}
            post={post}
            mode="create"
            user={session?.user}
          />
        </div>
      </div>
      <Toaster position="bottom-left" />
    </EditorLayout>
  );
};

CreatePost.auth = true;

export default CreatePost;
