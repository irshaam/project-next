import { CogIcon } from "@heroicons/react/outline";
import { withFormik, FormikProps, Form, Field, ErrorMessage, Formik } from "formik";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import * as Yup from "yup";

import { PostEditor } from "../../../components/editor";
import TextInput from "../../../components/form/input-text";
import ThaanaInput from "../../../components/form/input-thaana";
import SingleSelect from "../../../components/form/single-select";
import PostSettings from "../../../components/post/settings";
import { sluggify } from "../../../utils/slugify";

import HeadingInput from "@/components/post/input-heading";
import DetailHeadingInput from "@/components/post/input-heading-detailed";
import LatinHeading from "@/components/post/latin-heading";
import { thaanaToLatin } from "@utils";
interface FormValues {
  /**
   * Heading Stuff
   */
  heading: string;
  heading_detailed?: string;
  latin_heading?: string;
  slug?: string;

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
  tags: string[];
  authors: string[];
  status: string;
  categoryId: number;
  locationId: number;
}
interface MyFormProps {
  types: any;
  tags: any;
}

const InnerForm = (props: FormikProps<FormValues> & MyFormProps) => {
  const { types, tags, setFieldValue, values, handleSubmit } = props;
  const [showSettings, setShowSettings] = useState<boolean>(true);
  const [document, updateDocument] = useState<any[]>([
    // {
    //   type: "heading",
    //   children: [{ text: "އެއާ ޓްރެފިކް ކޮންޓްރޯލް ބޭރު މީހުންނަށް ދޭން ނިންމި ނިންމުން ބަދަލުކޮށްފި" }],
    // },
    {
      type: "paragraph",
      children: [
        {
          text: "ބޭރުގެ 100 ޕަސެންޓް ހިއްސާވާ ކުންފުނިތަކަށް އެއާޕޯޓާ އެކު، އެއާ ޓްރެފިކް ކޮންޓްރޯލް ހިންގަން ހުއްދަ ދޭން އިއްޔެ ނިންމި ނިންމުން ސަރުކާރުން ބަދަލުކޮށްފި އެވެ",
        },
      ],
    },
    {
      type: "paragraph",
      children: [
        {
          type: "link",
          url: "https://www.google.com",
          children: [
            {
              text: "ބޭރ، އެއާ ޓްރެފިކް ކޮންޓްރޯލް ހިންގަން ހުއްދަ ދޭން އިއްޔެ",
            },
            { text: "ގެ 100 ޕަސެންޓް ހިއްސާވާ ކުންފުނިތަކަށް އެއާޕޯޓާ އެކު", bold: true },
          ],
        },
        {
          text: " ނިންމި ނިންމުން ސަރުކާރުން ބަދަލުކޮށްފި އެވެ",
        },
      ],
    },
  ]);

  const documentChangeHandler = (document: any) => {
    updateDocument(document);
    setFieldValue("content", document);
  };

  return (
    <Form autoComplete="off" autoCorrect="off" autoCapitalize="off" noValidate>
      <div style={{ width: "1400px", paddingTop: "70px" }}>
        {/* EDITOR */}
        <div className=" max-w-lg bg-gray-200 whitespace-normal fixed left-0 top-0 mt-24 ml-5">
          <pre>
            <code className="text-xs whitespace-code-wrap">{JSON.stringify(document, null, 2)}</code>
          </pre>
        </div>

        <div className="w-full flex items-center flex-col">
          <div className="flex flex-col " style={{ width: "680px", marginBottom: "30px" }}>
            {/* Short Heading */}
            <div className="">
              {values.heading.length}/90
              <HeadingInput
                // label=" ސުރުޚީ"
                title="Heading"
                name="heading"
                id="heading"
                type="text"
                placeholder="ސުރުޚީ"
                className="h-16 leading-10 text-3xl font-mv-waheed"
                maxLength={90}
                component={TextareaAutosize}
                onInput={(e: any) => setFieldValue("latin_heading", thaanaToLatin(e.target.value))}
              />
            </div>

            {/* Detailed Heading */}
            {/* <div className="mb-2">
              <HeadingInput
                title="Heading Detailed"
                name="heading_detailed"
                id="heading_detailed"
                type="text"
                placeholder="ދިގު ސުރުޚީ"
                component={TextareaAutosize}
                className="h-16 leading-10 text-xl font-mv-typewriter-bold"
              />
            </div> */}

            {/* Latin Heading */}
            {/* <div className="mb-8">
              <LatinHeading
                title="Latin Heading"
                name="latin_heading"
                className="h-5"
                type="text"
                placeholder="Latin Heading"
              />
            </div> */}

            {/* <div>
              <div className="bg-white p-3">
                <img src="https://images-01.avas.mv/post/big_2fnuISv6EXENLkD05DrU4q6Cn.jpg" alt="" />
              </div>
            </div>

            <div className="mb-1">
              <HeadingInput
                title="Lead Text"
                name="lead_text"
                id="lead_text"
                type="text"
                placeholder="ލީޑް"
                className="h-16 leading-10 text-lg font-mv-typewriter-bold"
              />
            </div>
            <div className="mb-1">
              <HeadingInput
                title="Highlight"
                name="highlights"
                id="highlights"
                type="textarea"
                placeholder="ހައިލައިޓްސް"
                className="h-16 leading-10 text-xl font-mv-waheed"
              />
            </div> */}

            {/* <div className="mb-8">
              <ThaanaInput
                label="ަކުރު ސުރުޚީ"
                name="name_en"
                type="text"
                placeholder="..."
                className="font-mv-typewriter-bold"
              />
            </div> */}
            {/* <div className="mb-8">
              <ThaanaInput
                label="ހުލާސާ"
                name="name_en"
                as="textarea"
                placeholder="..."
                className="font-mv-typewriter-bold"
              />
            </div> */}
          </div>
          {/* <div className="flex flex-col " style={{ width: "680px", marginBottom: "30px" }}>
            <input
              type="text"
              placeholder="ަކުރު ސުރުޚީ"
              // value="ޓީޗަރަކު ދަރިވަރުންތަކަކަށް ޖިންސީ ގޯނާކުރި މައްސަލައެއް"
              className="thaana font-mv-waheed bg-transparent focus:outline-none focus:border-none border-none mb-8 "
              style={{ fontSize: "46px", lineHeight: "65px" }}
            />
          </div> */}

          {/* <div className="sm:col-span-3">
            <ThaanaInput
              label="ޓެގުގެ ނަން"
              name="name"
              type="text"
              placeholder="..."
              className="font-mv-typewriter-bold"
            />
          </div> */}

          <PostEditor document={document} onChange={documentChangeHandler}></PostEditor>
        </div>
        {/* EDITOR OFF */}
      </div>
      {/* Show POST Settings */}
      <div className="fixed top-0 right-0 py-6 px-4 flex items-center justify-end" style={{ width: "350px" }}>
        <button
          type="button"
          onClick={(): void => setShowSettings(!showSettings)}
          className="ml-5 flex-shrink-0 rounded-full p-1 text-gray-400 hover:text-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red"
        >
          <CogIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      {/* <PostSettings
        values={values}
        onSubmit={handleSubmit}
        show={showSettings}
        onClose={(): void => setShowSettings(false)}
        tags={tags}
      /> */}
    </Form>
  );
};

const validationSchema = Yup.object().shape({
  // name: Yup.string().required("required"),
});

const CreateTagForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: (props) => ({
    heading: "",
    latin_heading: "",

    typeId: 1,
    name: "",
    name_en: "",
    content: "",
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
    tags: [],
    status: "draft",
    authors: [1],
    layout: "default",
    topiId: "",
    categoryId: "",
    locationId: "",
  }),
  validationSchema,
  handleSubmit: async (values) => {
    console.log(values);
  },
})(InnerForm);

export default CreateTagForm;
