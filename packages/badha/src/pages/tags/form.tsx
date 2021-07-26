import { withFormik, FormikProps, Form, Field, ErrorMessage, Formik } from "formik";
import * as Yup from "yup";

import TextInput from "../../components/form/input-text";
import ThaanaInput from "../../components/form/input-thaana";
import SingleSelect from "../../components/form/single-select";
import { sluggify } from "../../utils/slugify";
interface FormValues {
  id?: number;
  typeId?: number;
  parentId?: number;
  name: string;
  name_en: string;

  description?: string;
  description_en?: string;

  image?: string;
  icon?: string;
  primary_color?: string;
  secondry_color?: string;
  layout?: string;

  // facebook
  og_image?: string;
  og_title?: string;
  og_description?: string;

  // twitter
  twitter_title?: string;
  twitter_description?: string;

  // twitter
  meta_title?: string;
  meta_description?: string;

  email: string;
  password: string;
  picture?: string;
  cover_picture?: string;
  bio?: string;
  bio_en?: string;
  twitter?: string;
  facebook?: string;
}
interface MyFormProps {
  types: any;
  tags: any;
}

const InnerForm = (props: FormikProps<FormValues> & MyFormProps) => {
  const { types, tags, setFieldValue, values } = props;

  return (
    <Form autoComplete="off" autoCorrect="off" autoCapitalize="off" noValidate>
      <div className="max-w-3xl mx-auto">
        <div className="space-y-1">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Tag Information</h3>
          {/* <p className="max-w-2xl text-sm text-gray-500">Use a permanent address where you can receive mail.</p> */}
        </div>

        <div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {/* name_en */}
            <div className="sm:col-span-3">
              <TextInput
                onInput={(e: any) => setFieldValue("slug", sluggify(e.target.value))}
                label="Name"
                name="name_en"
                type="text"
                placeholder="..."
              />
            </div>
            {/* name */}
            <div className="sm:col-span-3">
              <ThaanaInput
                label="ޓެގުގެ ނަން"
                name="name"
                type="text"
                placeholder="..."
                className="font-mv-typewriter-bold"
              />
            </div>
            {/* slug */}
            <div className="sm:col-span-2">
              <TextInput label="Slug" name="slug" type="text" placeholder="..." className="font-mv-typewriter-bold" />
            </div>

            {/* tag type */}
            <div className="sm:col-span-2">
              <SingleSelect label="Type" name="typeId" options={types} placeholder="...." />
            </div>
            {/* parent tag */}
            <div className="sm:col-span-2">
              <SingleSelect label="Parent" name="parentId" options={tags} placeholder="...." />
            </div>

            {/* description  en*/}
            <div className="sm:col-span-3">
              <TextInput label="Description" name="description_en" as="textarea" placeholder="..." />
            </div>

            {/* description */}
            <div className="sm:col-span-3">
              <ThaanaInput label="ޑިސްކްރިޕްށަން" name="description" as="textarea" placeholder="..." />
            </div>

            <div className="sm:col-span-4">
              {/* <Field
                as="select"
                name="typeId"
                value={values.typeId}
                className="bg-transparent w-full rounded-md focus:ring-4 border-2 focus:border-red focus:border-opacity-20 focus:ring-red focus:ring-opacity-10"
              >
                {types.map((type: Record<string, any>) => (
                  <option value={type.id} key={`tag_type_${type.id}`}>
                    {type.name}
                  </option>
                ))}
              </Field> */}
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Meta Data</h3>
          <p className="max-w-2xl text-sm text-gray-500">Extra content for search engines.</p>
        </div>

        <div className="mb-8">
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {/* description  en*/}
            <div className="sm:col-span-6">
              <TextInput label="Meta Title" name="og_title" type="text" placeholder="..." />
            </div>
            <div className="sm:col-span-6">
              <TextInput label="Description" name="description_en" as="textarea" placeholder="..." />
            </div>
          </div>
        </div>

        {/* facebook */}
        <div className="space-y-1">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Facebook Card</h3>
          <p className="max-w-2xl text-sm text-gray-500">Customise Open Graph data.</p>
        </div>

        <div className="mt-8 mb-8">
          <div className="grid grid-rows-2 grid-flow-col gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3 row-span-2">
              <div className="mb-5">
                <TextInput label="OG Title" name="og_title" type="text" placeholder="..." />
              </div>
              <div>
                <TextInput label="OG Description" name="og_descriptino" as="textarea" placeholder="..." />
              </div>
            </div>
            <div className="sm:col-span-3 bg-gray-100 row-span-2 text-gray-400 text-center">OG IMAGE</div>
          </div>
        </div>

        {/* twitter */}
        <div className="space-y-1">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Twitter Card</h3>
          <p className="max-w-2xl text-sm text-gray-500">Customised structured data for Twitter.</p>
        </div>

        <div className="mt-8">
          <div className="grid grid-rows-2 grid-flow-col gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3 row-span-2">
              <div className="mb-5">
                <TextInput label="Twitter Title" name="twitter_title" type="text" placeholder="..." />
              </div>
              <div>
                <TextInput label="Twitter Description" name="twitter_description" as="textarea" placeholder="..." />
              </div>
            </div>
            <div className="sm:col-span-3 bg-gray-100 row-span-2 text-gray-400 text-center">TWITTER IMAGE</div>
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

const CreateTagForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: (props) => ({
    typeId: 1,
    name: "",
    name_en: "",
    slug: "",
    email: "",
    password: "",
    picture: "",
    cover_picture: "",
    bio: "",
    bio_en: "",
    twitter: "",
    facebook: "",
    is_active: true,
  }),
  validationSchema,
  handleSubmit: async (values) => {
    console.log(values);
  },
})(InnerForm);

export default CreateTagForm;
