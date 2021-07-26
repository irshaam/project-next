import { getTags } from "@/api";
import { useRouter } from "next/router";

import client from "../../../api/client";
import { MainLayout } from "../../../components";
import CreateMediaForm from "../../../components/pages/posts/form";

export async function getServerSideProps(context: any) {
  const tags = await getTags();
  return {
    props: {
      tags,
    },
  };
}

const UserCreate = ({ tags }: { tags: any }) => {
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    const formData = new FormData();

    for (let key in values) {
      if (key === "files") {
        for (let i = 0; i < values[key].length; i++) {
          console.log(i, values[key][i]);
          formData.append(`files`, values[key][i]);
        }
      } else {
        formData.append(key, values[key]);
      }
    }

    try {
      const response = await client.post(`/media/upload`, formData);

      router.push("/media");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <MainLayout>
      {/* !-- Page heading --> */}

      <div className="space-y-6 mt-4 px-10">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <CreateMediaForm onSubmit={handleSubmit} tags={tags} />
        </div>
      </div>
    </MainLayout>
  );
};
export default UserCreate;
