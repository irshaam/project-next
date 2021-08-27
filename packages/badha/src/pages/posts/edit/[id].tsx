import { getSession, useSession } from "next-auth/client";
import router from "next/router";
import toast, { Toaster } from "react-hot-toast";

import client from "../../../api/client";
import EditorLayout from "../../../components/layouts/EditorLayout";
import CreatePostForm from "../form";
import PostNav from "../post-nav";

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  let post = {};
  let tags = [];
  let headers = {};
  let authors = [];

  if (session) {
    headers = { Authorization: `Bearer ${session.access_token}` };
  }
  const { params } = context;
  try {
    const { data } = await client.get(`/posts/${params.id}`, { headers });

    post = data;
  } catch (e) {
    console.log(e);

    return {
      // redirect: {
      //   destination: "/unauthorized",
      //   permanent: false,
      // },
    };
  }

  try {
    const { data } = await client.get("/users/authors", { headers });
    authors = data;
  } catch (e) {
    console.log(e);

    return {};
  }

  try {
    const { data } = await client.get("/tags", { headers });
    tags = data;
  } catch (e) {
    console.log(e);

    return {
      // redirect: {
      //   destination: "/unauthorized",
      //   permanent: false,
      // },
    };
  }

  return {
    props: {
      post,
      authors,
      tags,
    }, // will be passed to the page component as props
  };
}

const CreatePost = ({ tags, post, authors }: { tags: any; post: any; authors: any }) => {
  const [session] = useSession();

  const handleSubmitForReview = async (values: any) => {
    const submitForReview = client.patch(
      `/post/review/${post.nanoid}`,
      { ...values },
      {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );

    toast.promise(submitForReview, {
      loading: "Submitting...",
      success: (data: any): any => {
        return router.push("/posts?type=draft");
      },
      error: <b>Could not submit.</b>,
    });

    const response = await submitForReview;
  };

  const handleSubmit = async (values: any) => {
    let headers = {};
    if (session) {
      headers = {
        Authorization: `Bearer ${session.access_token}`,
      };
    }
    const formData = new FormData();

    for (let key in values) {
      formData.append(key, values[key]);
    }
    const updatePost = client.patch(`/posts/${post.nanoid}`, { ...values }, { headers });

    toast.promise(updatePost, {
      loading: "Saving...",
      success: (data: any): any => {
        return data.data.status === "review" ? router.push("/posts?type=copydesk") : `Post updated..`;
      },
      error: <b>Could not save.</b>,
    });

    const response = await updatePost;
  };
  return (
    <EditorLayout>
      {/* !-- Page heading --> */}
      <PostNav status={post.status} updatedAt={post.updatedAt} />
      <div className="space-y-6 mt-4 px-10">
        <div className="bg-primary  px-4 py-5 sm:rounded-lg sm:p-6">
          {/* <div className="bg-primary shadow px-4 py-5 sm:rounded-lg sm:p-6"> */}
          <CreatePostForm
            onSubmit={handleSubmit}
            authors={authors}
            tags={tags}
            post={post}
            user={session?.user}
            mode={post.status}
          />
        </div>
      </div>
      <Toaster position="bottom-left" />
    </EditorLayout>
  );
};

CreatePost.auth = true;

export default CreatePost;
