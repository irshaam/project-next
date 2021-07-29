import { withFormik, FormikProps, Form, Field, ErrorMessage, Formik } from "formik";
import * as Yup from "yup";

import client from "../../../api/client";
import TextInput from "../../../components/form/input-text";
import ThaanaInput from "../../../components/form/input-thaana";
import MainLayout from "../../../components/layouts/MainLayout";

import { getUserByID } from "@/api/user";

export async function getServerSideProps({ params }) {
  const user = await getUserByID(params.id);
  return {
    props: {
      user,
    },
  };
}

interface FormValues {
  id?: number;
  name: string;
  nameEn?: string;
  slug: string;
  email: string;
  password: string;
  picture?: string;
  coverPicture?: string;
  bio?: string;
  bioEn?: string;
  twitter?: string;
  facebook?: string;
  isActive?: boolean;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  return (
    <Form autoComplete="off" autoCorrect="off" autoCapitalize="off" noValidate>
      <div className="max-w-3xl mx-auto">
        <div className="space-y-1">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
          <p className="max-w-2xl text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
        </div>

        <div className="pt-8">
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {/* nameEn */}
            <div className="sm:col-span-3">
              <TextInput label="Name" name="nameEn" type="text" placeholder="..." />
            </div>
            {/* name */}
            <div className="sm:col-span-3">
              <ThaanaInput
                name="name"
                type="text"
                placeholder="..."
                label="ފުރުހަމަ ނަން"
                className="font-mv-typewriter-bold"
              />
            </div>
            {/* email */}
            <div className="sm:col-span-4">
              <TextInput label="Email" name="email" type="text" placeholder="user@example.com" />
            </div>
            {/* password */}
            <div className="sm:col-span-4">
              <TextInput label="Passowrd" name="password" type="password" placeholder="****" />
            </div>
            {/* bio */}
            <div className="sm:col-span-6">
              <ThaanaInput label="ވަނަވަރު" name="bio" as="textarea" placeholder="..." />
            </div>
            {/* bio_ne */}
            <div className="sm:col-span-6">
              <TextInput label="Bio" name="bioEn" as="textarea" placeholder="...." />
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
};

interface MyFormProps {
  user: any;
  onSubmit(formData: FormValues): void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("required"),
});

const CreateUserForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: ({ user }) => ({
    name: user.name || "",
    nameEn: user.nameEn || "",
    slug: user.slug || "",
    email: user.email || "",
    password: "",
    picture: user.picture || "",
    coverPicture: user.coverPicture || "",
    bio: user.bio || user.bio || "",
    bioEn: user.bioEn || "",
    twitter: user.twitter || "",
    facebook: user.facebook || "",
    isActive: user.isActive || "true",
  }),
  validationSchema,
  handleSubmit: async (values, formikBag) => {
    formikBag.props.onSubmit({ ...values });
    formikBag.setSubmitting(false);
  },
})(InnerForm);

const UserUpdate = ({ user }) => {
  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    console.log(values);

    for (let key in values) {
      formData.append(key, values[key]);
    }
    const response = await client.patch(`/users/${user.id}`, formData);
    alert("User updated successfully!");
  };
  return (
    <MainLayout>
      {/* !-- Page heading --> */}

      <div className="space-y-6 mt-4 px-10">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <CreateUserForm onSubmit={handleSubmit} user={user} />
          {/* <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white"> */}
        </div>
      </div>
    </MainLayout>
  );
};
export default UserUpdate;
