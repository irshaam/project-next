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
  id?: number;
  slug?: string;

  /**
   * Heading Stuff
   */
  heading: string;
  headingDetailed?: string;
  latinHeading?: string;
  highlights?: string;
  leadText?: string;
  featuredMedia?: string;

  content?: string;
  contentHtml?: string;

  editorComments?: string;
  remarks?: string;

  layout?: string;
  tags: any[];
  authors: any[];
  status: string;
  categoryId: number;
  locationId: number;
  topicId?: number;

  // facebook
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;

  // twitter
  twitterTitle?: string;
  twitterDescription?: string;

  // gen
  metaTitle?: string;
  metaDescription?: string;
}
interface MyFormProps {
  types: any;
  tags: any;
  onSubmit(formData: FormValues): void;
}

const InnerForm = (props: FormikProps<FormValues> & MyFormProps) => {
  const { types, tags, setFieldValue, values, handleSubmit } = props;
  const [showSettings, setShowSettings] = useState<boolean>(true);
  const [document, updateDocument] = useState<any[]>([
    {
      type: "heading",
      children: [{ text: "" }],
    },
    {
      type: "paragraph",
      children: [
        {
          text: "",
        },
      ],
    },
    // {
    //   type: "paragraph",
    //   children: [
    //     {
    //       type: "link",
    //       url: "https://www.google.com",
    //       children: [
    //         {
    //           text: "ބޭރ، އެއާ ޓްރެފިކް ކޮންޓްރޯލް ހިންގަން ހުއްދަ ދޭން އިއްޔެ",
    //         },
    //         { text: "ގެ 100 ޕަސެންޓް ހިއްސާވާ ކުންފުނިތަކަށް އެއާޕޯޓާ އެކު", bold: true },
    //       ],
    //     },
    //     {
    //       text: " ނިންމި ނިންމުން ސަރުކާރުން ބަދަލުކޮށްފި އެވެ",
    //     },
    //   ],
    // },
  ]);

  const documentChangeHandler = (document: any) => {
    updateDocument(document);
    setFieldValue("content", document);
  };

  return (
    <Form autoComplete="off" autoCorrect="off" autoCapitalize="off" noValidate>
      <div style={{ width: "1400px", paddingTop: "70px" }}>
        {/* EDITOR */}
        {/* <div className=" max-w-lg bg-gray-200 whitespace-normal fixed left-0 top-0 mt-24 ml-5">
          <pre>
            <code className="text-xs whitespace-code-wrap">{JSON.stringify(document, null, 2)}</code>
          </pre>
        </div> */}

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
                onInput={(e: any) => {
                  setFieldValue("latinHeading", thaanaToLatin(e.target.value));
                  setFieldValue("slug", sluggify(thaanaToLatin(e.target.value)));
                }}
              />
            </div>

            {/* Detailed Heading */}
            <div className="mb-2">
              <HeadingInput
                title="Heading Detailed"
                name="headingDetailed"
                id="headingDetailed"
                type="text"
                placeholder="ދިގު ސުރުޚީ"
                component={TextareaAutosize}
                className="h-16 leading-10 text-xl font-mv-typewriter-bold"
              />
            </div>
            {/* Latin Heading */}
            <div className="mb-8">
              <LatinHeading
                title="Latin Heading"
                name="latinHeading"
                className="h-5"
                type="text"
                placeholder="Latin Heading"
                onChange={(e: any) => setFieldValue("slug", sluggify(e.target.value))}
              />
            </div>
            {/*
            <div>
              <div className="bg-white p-3">
                <img src="https://images-01.avas.mv/post/big_2fnuISv6EXENLkD05DrU4q6Cn.jpg" alt="" />
              </div>
            </div> */}

            <div className="mb-1">
              <HeadingInput
                title="Lead Text"
                name="leadText"
                id="leadText"
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
            </div>

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

          <PostEditor autoCapitalize document={document} onChange={documentChangeHandler}></PostEditor>
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
      <PostSettings
        values={values}
        onSubmit={handleSubmit}
        show={showSettings}
        onClose={(): void => setShowSettings(false)}
        tags={tags}
      />
    </Form>
  );
};

// categoryId: Yup.string().required("required"),
const validationSchema = Yup.object().shape({
  heading: Yup.string().required("required"),
});

const CreateTagForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: (props) => ({
    heading: "",
    slug: "",
    categoryId: null,
    // headingDetailed: "",
    // leadText: "",
    // latinHeading: "",
    // highlights: "",
    // content: "",
    // status: "draft",
    // authors: [1],
    // layout: "default",
    // topicId: null,
    // categoryId: null,
    // locationId: null,
    // tags: [],
    // slug: "",
  }),
  validationSchema,
  handleSubmit: async (values, formikBag) => {
    formikBag.props.onSubmit({ ...values });
    formikBag.setSubmitting(false);
  },
})(InnerForm);

export default CreateTagForm;
