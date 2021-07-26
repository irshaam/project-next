import { withFormik, FormikProps, Form, Field, ErrorMessage, Formik } from "formik";
import * as Yup from "yup";

import client from "../../../api/client";
import TextInput from "../../../components/form/input-text";
import ThaanaInput from "../../../components/form/input-thaana";
import MainLayout from "../../../components/layouts/MainLayout";

export const getStaticPaths: GetStaticPaths<{ id: string | number }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:5000/users/${params.id}`);
  const user = await res.json();

  console.log(user);

  return {
    props: {
      user,
    }, // will be passed to the page component as props
  };
}

interface FormValues {
  id?: number;
  name: string;
  name_en?: string;
  slug: string;
  email: string;
  password: string;
  picture?: string;
  cover_picture?: string;
  bio?: string;
  bio_en?: string;
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
            {/* name_en */}
            <div className="sm:col-span-3">
              <TextInput label="Name" name="name_en" type="text" placeholder="..." />
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
              <TextInput label="Passowrd" name="passowd" type="password" placeholder="****" />
            </div>
            {/* bio */}
            <div className="sm:col-span-6">
              <ThaanaInput label="ވަނަވަރު" name="bio" as="textarea" placeholder="..." />
            </div>
            {/* bio_ne */}
            <div className="sm:col-span-6">
              <TextInput label="Bio" name="bio_en" as="textarea" placeholder="...." />
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
    name_en: user.name_en || "",
    slug: user.slug || "",
    email: user.email || "",
    password: "",
    picture: user.picture || "",
    cover_picture: user.cover_picture || "",
    bio: user.bio || user.bio || "",
    bio_en: user.bio_en || "",
    twitter: user.twitter || "",
    facebook: user.facebook || "",
    isActive: user.isActive || true,
  }),
  validationSchema,
  handleSubmit: async (values, formikBag) => {
    formikBag.props.onSubmit({ ...values });
    formikBag.setSubmitting(false);
  },
})(InnerForm);

const UserCreate = ({ user }) => {
  console.log(user);
  const handleSubmit = async (values: any) => {
    const formData = new FormData();

    for (let key in values) {
      formData.append(key, values[key]);
    }
    const response = await client.patch(`/users/${user.id}`, formData);
    console.log(response);
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
export default UserCreate;
