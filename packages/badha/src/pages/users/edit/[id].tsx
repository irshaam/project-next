import { getSession, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

import client from "../../../api/client";
import MainLayout from "../../../components/layouts/MainLayout";
import UserForm from "../user-form";

import { getUserByID } from "@/api/user";

export async function getServerSideProps({ params, req }) {
  const session = await getSession({ req });
  let headers = {};
  let roles = [];
  let user = {};
  if (session) {
    headers = { Authorization: `Bearer ${session.access_token}` };
  }

  try {
    let { data } = await client.get(`/users/${params.id}`, { headers });
    user = data;
  } catch (e) {
    console.log(e);
  }

  try {
    let { data } = await client.get("/roles", { headers });
    roles = data;
  } catch (e) {
    console.log(e);
  }
  return {
    props: {
      user,
      roles,
    },
  };
}

const UserUpdate = (props: any) => {
  const { user, roles } = props;
  const [session] = useSession();
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    let headers = {};
    if (session) {
      headers = { Authorization: `Bearer ${session.access_token}` };

      const createUser = client.patch(`/users/${user.id}`, { ...values }, { headers });

      toast.promise(createUser, {
        loading: "Updating  user...",
        success: <b>User updated!</b>,
        error: <b>Could not save.</b>,
      });

      const response = await createUser;

      // Move to new page
      if (response.status === 201) {
        router.back();
      }
    }
  };
  return (
    <MainLayout>
      {/* !-- Page heading --> */}
      <div className="space-y-6 mt-4 px-10">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <UserForm onSubmit={handleSubmit} user={user} roles={roles} />
          {/* <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white"> */}
        </div>
      </div>{" "}
      <Toaster position="bottom-right" />
    </MainLayout>
  );
};

UserUpdate.auth = true;
export default UserUpdate;
