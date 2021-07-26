import client from "../../api/client";
import MainLayout from "../../components/layouts/MainLayout";

export async function getStaticProps(context: any) {
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

import CreateTagForm from "./form";
const UserCreate = ({ types, tags }: { types: any; tags: any }) => {
  const submit = () => {
    const response = client.post("/users/create");
  };
  return (
    <MainLayout>
      {/* !-- Page heading --> */}

      <div className="space-y-6 mt-4 px-10">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <CreateTagForm types={types} tags={tags} />
        </div>
      </div>
    </MainLayout>
  );
};
export default UserCreate;
