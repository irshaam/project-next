import { sluggify } from "@utils/slugify";
import { withFormik, FormikProps, Form, Field, ErrorMessage, Formik } from "formik";
import * as Yup from "yup";

import client from "../../api/client";
import TextInput from "../../components/form/input-text";
import ThaanaInput from "../../components/form/input-thaana";
import MainLayout from "../../components/layouts/MainLayout";

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
  is_active?: boolean;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { setFieldValue } = props;

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
              <TextInput
                label="Name"
                name="name_en"
                onInput={(e: any) => setFieldValue("slug", sluggify(e.target.value))}
                type="text"
                placeholder="..."
              />
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
              <TextInput label="Password" name="password" type="password" placeholder="****" />
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
  user?: any;
  onSubmit(formData: FormValues): void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("required"),
});

const CreateUserForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: ({ user }) => ({
    name: user ? user.name : "",
    name_en: user ? user.name_en : "",
    slug: user ? user.slug : "",
    email: user ? user.email : "",
    password: "",
    picture: user ? user.picture : "",
    cover_picture: user ? user.cover_picture : "",
    bio: user ? user.bio : user ? user.bio : "",
    bio_en: user ? user.bio_en : "",
    twitter: user ? user.twitter : "",
    facebook: user ? user.facebook : "",
    isActive: user ? user.isActive : true,
  }),
  validationSchema,
  handleSubmit: async (values, formikBag) => {
    formikBag.props.onSubmit({ ...values });
    formikBag.setSubmitting(false);
  },
})(InnerForm);

const UserCreate = () => {
  const handleSubmit = async (values: any) => {
    const formData = new FormData();

    for (let key in values) {
      formData.append(key, values[key]);
    }
    const response = await client.post(`/users`, formData);
    console.log(response);
  };
  return (
    <MainLayout>
      {/* !-- Page heading --> */}

      <div className="space-y-6 mt-4 px-10">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <CreateUserForm onSubmit={handleSubmit} />
          {/* <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white"> */}
        </div>
      </div>
    </MainLayout>
  );
};
export default UserCreate;
