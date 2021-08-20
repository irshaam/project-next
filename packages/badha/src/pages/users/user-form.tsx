import { sluggify } from "@utils/slugify";
import { withFormik, FormikProps, Form, Field, ErrorMessage, Formik } from "formik";
import * as Yup from "yup";

import TextInput from "../../components/form/input-text";
import ThaanaInput from "../../components/form/input-thaana";

import { AvatarInput } from "@/components/form";

interface MyFormProps {
  user?: any;
  roles?: any;
  onSubmit(formData: FormValues): void;
}

interface Role {
  id: number;
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
  roles?: Role[];
}

const InnerForm = (props: FormikProps<FormValues> & MyFormProps) => {
  const { setFieldValue, roles, values, user } = props;

  // console.log(props.user);

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
              <TextInput
                label="Name"
                name="nameEn"
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

            <div className="sm:col-span-6">
              <AvatarInput label="Picture" name="pictureId" type="file" default={user?.picture} />
            </div>

            {/* bio */}
            <div className="sm:col-span-6">
              <ThaanaInput label="ވަނަވަރު" name="bio" as="textarea" placeholder="..." />
            </div>
            {/* bio_ne */}
            <div className="sm:col-span-6">
              <TextInput label="Bio" name="bioEn" as="textarea" placeholder="...." />
            </div>
            {/* roles */}
            <div className="sm:col-span-6">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 text-light-gray">Roles</label>
                <div role="group" className="grid grid-cols-3 gap-4 mt-2">
                  {roles &&
                    roles.map((role: any) => (
                      <div key={`role_${role.id}`}>
                        <label>
                          <Field
                            className="focus:ring-rk-dark h-5 checked:bg-blue-600 checked:border-transparent  w-5 text-rk-dark border-gray-300 rounded checkbox mr-4"
                            type="checkbox"
                            name="roles"
                            value={`${role.id}`}
                          />

                          {role.name}
                        </label>
                      </div>
                    ))}
                </div>
              </div>
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

const validationSchema = Yup.object().shape({
  name: Yup.string().required("required"),
});

const UserForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: ({ user }) => ({
    name: user ? user.name : "",
    nameEn: user ? user.nameEn : "",
    slug: user ? user.slug : "",
    email: user ? user.email : "",
    password: "",
    pictureId: (user && user.pictureId) || null,
    coverPictureId: (user && user.coverPictureId) || null,
    bio: (user && user.bio) || "",
    bioEn: (user && user.bioEn) || "",
    twitter: user ? user.twitter : "",
    facebook: user ? user.facebook : "",
    isActive: user ? user.isActive : true,
    roles: (user && user.roles?.map((role: { id: number }) => String(role.id))) || [],
  }),
  validationSchema,
  handleSubmit: async (values, formikBag) => {
    const formData = {
      ...values,
      roles: values.roles ? values.roles.map((role: any) => ({ id: Number(role) })) : [],
    };
    formikBag.props.onSubmit(formData);
    formikBag.setSubmitting(false);
  },
})(InnerForm);

export default UserForm;
