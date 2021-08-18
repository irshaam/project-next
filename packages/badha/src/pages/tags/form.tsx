import { TagIcon } from "@heroicons/react/solid";
import { withFormik, FormikProps, Form, Field, ErrorMessage, Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";

import { TextInput, ThaanaInput, SingleSelect, Select } from "@/components/form";
import { sluggify } from "@utils/slugify";

interface FormValues {
  id?: number;
  typeId?: number;
  parentId?: number | null;
  name: string;
  nameEn: string;

  description?: string;
  description_en?: string;

  // image?: string;
  // icon?: string;
  // primary_color?: string;
  // secondry_color?: string;
  // layout?: string;

  // // facebook
  // og_image?: string;
  // og_title?: string;
  // og_description?: string;

  // // twitter
  // twitter_title?: string;
  // twitter_description?: string;

  // // twitter
  // meta_title?: string;
  // meta_description?: string;

  // email: string;
  // password: string;
  // picture?: string;
  // cover_picture?: string;
  // bio?: string;
  // bio_en?: string;
  // twitter?: string;
  // facebook?: string;
}
interface MyFormProps {
  tagTypes: any;
  tags: any;
  onSubmit(values: any): void;
  mode: string;
  tag?: any;
}

const InnerForm = (props: FormikProps<FormValues> & MyFormProps) => {
  const { tagTypes, tags, setFieldValue, values } = props;

  return (
    <Form autoComplete="off" autoCorrect="off" autoCapitalize="off" noValidate>
      <div className="max-w-3xl mx-auto">
        <div className="space-y-1">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Tag Information</h3>
          {/* <p className="max-w-2xl text-sm text-gray-500">Use a permanent address where you can receive mail.</p> */}
        </div>

        <div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {/* nameEn */}
            <div className="sm:col-span-3">
              <TextInput
                onInput={(e: any) => setFieldValue("slug", sluggify(e.target.value))}
                label="Name"
                name="nameEn"
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
              {tags && (
                <Select
                  label="Type"
                  name="typeId"
                  id="typeId"
                  placeholder="..."
                  options={tagTypes.map((type: any) => ({ nameEn: type.name, id: type.id }))}
                  isMulti={false}
                />
              )}
            </div>
            {/* parent tag */}
            <div className="sm:col-span-2">
              {tags && (
                <Select
                  label="Parent"
                  name="parentId"
                  id="parentId"
                  placeholder="..."
                  options={tags.filter((tag: any) => tag.parentId === null)}
                  isMulti={false}
                />
              )}
            </div>

            {/* description  en*/}
            <div className="sm:col-span-3">
              <TextInput label="Description" name="descriptionEn" as="textarea" placeholder="..." />
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

        {/* buttons */}
        <div className="pt-5">
          <div className="flex justify-end">
            {/* <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button> */}
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
  nameEn: Yup.string().required("required"),
  slug: Yup.string().required("required"),
  typeId: Yup.number().required("required"),
});

const CreateTagForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: ({ tag }) => ({
    id: (tag && tag.id) || null,
    typeId: (tag && tag.typeId) || 1,
    name: (tag && tag.name) || "",
    nameEn: (tag && tag.nameEn) || "",
    slug: (tag && tag.slug) || "",
    description: (tag && tag.description) || "",
    parentId: (tag && tag.parentId) || null,
    descriptionEn: (tag && tag.descriptionEn) || "",
  }),
  validationSchema,
  handleSubmit: async (values, formikBag) => {
    if (formikBag.props.mode === "create") {
      delete values.id;
    }
    formikBag.props.onSubmit({ ...values });
    formikBag.setSubmitting(false);
  },
})(InnerForm);

export default CreateTagForm;
