import client from "../../../api/client";
import EditorLayout from "../../../components/layouts/EditorLayout";

import CreatePostForm from "./form";

import { getTags, getTagTypes } from "@/api";

export async function getServerSideProps(context: any) {
  const tagTypes = await getTagTypes();
  const tags = await getTags();

  return {
    props: {
      tagTypes,
      tags,
    }, // will be passed to the page component as props
  };
}

const CreatePost = ({ types, tags }: { types: any; tags: any }) => {
  const handleSubmit = async (values: any) => {
    const formData = new FormData();

    for (let key in values) {
      formData.append(key, values[key]);
    }
    const response = await client.post(`/posts`, formData);
    console.log(response);
  };
  return (
    <EditorLayout>
      {/* !-- Page heading --> */}

      <div className="space-y-6 mt-4 px-10">
        <div className="bg-primary shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <CreatePostForm onSubmit={handleSubmit} types={types} tags={tags} />
        </div>
      </div>
    </EditorLayout>
  );
};
export default CreatePost;
