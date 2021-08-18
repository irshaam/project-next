import { getSession, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

import client from "../../../api/client";
import MainLayout from "../../../components/layouts/MainLayout";
import UserForm from "../user-form";

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  let headers = {};
  let roles = [];

  if (session) {
    headers = { Authorization: `Bearer ${session.access_token}` };
  }

  try {
    let { data } = await client.get("/roles", { headers });
    roles = data;
  } catch (e) {
    console.log(e);
  }
  return {
    props: {
      roles,
    },
  };
}

const UserCreate = (props: any) => {
  const { roles } = props;
  const [session] = useSession();
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    let headers = {};
    if (session) {
      headers = { Authorization: `Bearer ${session.access_token}` };

      const createUser = client.post(`/users`, { ...values }, { headers });

      toast.promise(createUser, {
        loading: "Creating new user...",
        success: <b>User created!</b>,
        error: <b>Could not save.</b>,
      });

      const response = await createUser;

      // Move to new page
      if (response.status === 201) {
        router.push({
          pathname: "/users",
          // query: { id: response.data.id },
        });
      }
    }
  };
  return (
    <MainLayout>
      <div className="space-y-6 mt-4 px-10">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <UserForm onSubmit={handleSubmit} roles={roles} />
        </div>
      </div>
      <Toaster position="bottom-right" />
    </MainLayout>
  );
};

UserCreate.auth = true;
export default UserCreate;
