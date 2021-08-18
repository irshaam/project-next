import { useAbility } from "@casl/react";
import { CogIcon, TagIcon } from "@heroicons/react/outline";
import { format } from "date-fns";
import { withFormik, FormikProps, Form, Field, ErrorMessage, Formik } from "formik";
import { nanoid } from "nanoid";
import React, { useState, useEffect, BaseSyntheticEvent } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Node } from "slate";
import * as Yup from "yup";

import { AbilityContext } from "../../components/auth/can";
import { PostEditor } from "../../components/editor";
import TextInput from "../../components/form/input-text";
import ThaanaInput from "../../components/form/input-thaana";
import SingleSelect from "../../components/form/single-select";
import PostSettings from "../../components/post/settings";
import { sluggify } from "../../utils/slugify";

import HeadingInput from "@/components/post/input-heading";
import DetailHeadingInput from "@/components/post/input-heading-detailed";
import HeadingHighlights from "@/components/post/input-heading-highlights";
import LatinHeading from "@/components/post/latin-heading";
import { translateToThaana, thaanaToLatin } from "@/utils";
interface FormValues {
  id?: number;
  /**
   * Heading Stuff
   */
  headingDetailed: string;
  heading?: string;
  latinHeading?: string;
  highlights?: string;
  leadText?: string;
  featuredMedia?: string;

  /**
   * All Taggings
   */
  categoryId: number;
  locationId?: number;
  topicId?: number;
  tags?: [];
  authors?: [];
  showAuthors?: boolean;

  /**
   * Content
   */
  content?: string;
  contentHtml?: string;

  editorComment?: string;

  // editorComments?: string;
  // remarks?: string;

  // layout?: string;
  // tags: any[];
  // authors: any[];
  status?: string;

  // // facebook
  // ogImage?: string;
  // ogTitle?: string;
  // ogDescription?: string;

  // // twitter
  // twitterTitle?: string;
  // twitterDescription?: string;

  // // gen
  // metaTitle?: string;
  // metaDescription?: string;
}
interface MyFormProps {
  tags: any;
  onSubmit(formData: FormValues): void;
  post: any;
  mode: string; // create , update , readonly
  user?: any;
  authors?: any;
}

const InnerForm = (props: FormikProps<FormValues> & MyFormProps) => {
  const ability = useAbility(AbilityContext);
  const { tags, setFieldValue, values, handleSubmit, mode, authors, post } = props;
  const [showSettings, setShowSettings] = useState<boolean>(true);
  const [document, updateDocument] = useState<any[]>([]);
  const [count, setCount] = useState<any>(0);
  useEffect(() => {
    if (post && post.content) {
      updateDocument(post.content);
      setCount(serialize(post.content));
    } else {
      updateDocument([
        {
          type: "paragraph",
          children: [
            {
              text: "",
            },
          ],
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const [document, updateDocument] = useState<any[]>([
  //   {
  //     type: "paragraph",
  //     id: "23123123",
  //     children: [
  //       {
  //         text: "",
  //       },
  //       // {
  //       //   text: "މުޅި ރާއްޖޭގައި މާސްކު އެޅުން މަޖުބޫރުކޮށްފައި އޮތް ނަމަވެސް ކޮވިޑްގެ ކޭހެއް ނެތުމުން މާސްކަށް އޮތީ މާބޮޑު ސަމާލު ކަމެއް ނުދެވި އެވެ. ޖަމާއަތް ހަދައިގެން އީދަށް ކެއްކުމާއި ކެއުމާއި އީދު ކުޅިވަރުގައި މުޅި ރާއްޖެެހެން ޝާމިލުވި އެވެ. އުފާވެރި އަދި ފޯރިގަދަ ދުވަސްތަކަށް ނިމުން އައިސް މިހާރު މި އޮތީ އަލުން މަސައްކަތަށް ނިކުނަން ޖެހިފަ އެވެ. އިއްޔެ ސަރުކާރު އެ ހުޅުވުނީ 15 ދުވަހުގެ ދިގު ބަންދަކަށް ފަހު އެވެ.",
  //       // },
  //     ],
  //   },
  //   // {
  //   //   type: "block-quote",
  //   //   children: [
  //   //     {
  //   //       text: "ދަތުރު ފަތުރުގެ ނިޒާމު ގާއިމުކުރުމުގެ ގޮތުން ސަރުކާރަކުން އޭނާ އަށް އެއްވެސް ރަށެއް.",
  //   //     },
  //   //   ],
  //   // },
  //   // {
  //   //   type: "paragraph",
  //   //   children: [
  //   //     {
  //   //       type: "link",
  //   //       url: "https://www.google.com",
  //   //       children: [
  //   //         {
  //   //           text: "ބޭރ، އެއާ ޓްރެފިކް ކޮންޓްރޯލް ހިންގަން ހުއްދަ ދޭން އިއްޔެ",
  //   //         },
  //   //         { text: "ގެ 100 ޕަސެންޓް ހިއްސާވާ ކުންފުނިތަކަށް އެއާޕޯޓާ އެކު", bold: true },
  //   //       ],
  //   //     },
  //   //     {
  //   //       text: " ނިންމި ނިންމުން ސަރުކާރުން ބަދަލުކޮށްފި އެވެ",
  //   //     },
  //   //   ],
  //   // },
  // ]);

  const WordCount = (str: any) => {
    return str.split(" ").filter(function (n: any) {
      return n != "";
    }).length;
  };

  const serialize = (nodes: any) => {
    const str = nodes.map((n: any) => Node.string(n)).join(" ");
    console.log(str);
    return WordCount(str);
  };

  const documentChangeHandler = (document: any) => {
    updateDocument(document);
    setFieldValue("content", document);
    setCount(serialize(document));
  };

  // useEffect(() => {
  //   if (values.heading) {
  //     setFieldValue("latinHeading", thaanaToLatin(values.heading));
  //     setFieldValue("slug", sluggify(thaanaToLatin(values.heading)));
  //   }
  // }, [setFieldValue, values.heading]);

  const submitForReview = () => {
    setFieldValue("status", "review");
    handleSubmit();
  };

  return (
    <Form autoComplete="off" autoCorrect="off" autoCapitalize="off" noValidate>
      <div style={{ width: "1400px", paddingTop: "70px" }}>
        <div className="flex  text-gray-400 fixed bottom-0 right-0 py-6 px-4 text-xs">
          <div className=" flex items-center text-right">
            <span className="px-2">{count}</span>
            <span className="font-mv-typewriter thaana mt-1 "> ބަސް :</span>
            {/* <span className="px-4">•</span> */}
          </div>

          {/* {post.updatedAt && (
            <div className="flex items-center text-right">
              <span className="px-2 "> {format(new Date(post.updatedAt), "dd-MM-yyyy - hh:mm")}</span>
              <span className="font-mv-typewriter thaana">އެންމެފަހުން އަޕްޑޭޓްކުރެވުނީ:</span>
            </div>
          )} */}
        </div>
        {/* EDITOR */}
        {/* <div className=" max-w-lg bg-gray-200 whitespace-normal fixed left-0 top-0 mt-24 ml-5">
          <pre>
            <code className="text-xs whitespace-code-wrap">{JSON.stringify(document, null, 2)}</code>
          </pre>
        </div> */}

        {/* <div
          className="text-xs absolute top-20 left-4 p-4 bg-gray-800 text-gray-200 rounded-lg shadow-lg overflow-scroll"
          style={{ width: "300px", maxHeight: "400px" }}
        >
          <pre>{JSON.stringify(values.content, null, 2)}</pre>
        </div> */}

        {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}

        <div className="w-full flex items-center flex-col">
          <div className="flex flex-col " style={{ width: "680px", marginBottom: "30px" }}>
            {/* Detailed Heading */}
            <div>
              <HeadingInput
                title="Heading"
                name="headingDetailed"
                id="headingDetailed"
                type="text"
                placeholder="ސުރުޚީ"
                component={TextareaAutosize}
                className="h-16 leading-10 text-xl font-mv-typewriter-bold"
                onInput={(event: BaseSyntheticEvent) => {
                  translateToThaana(event);
                }}
              />
            </div>

            {/* Short Heading */}
            <div className="mb-2">
              {/* {values.heading?.length}/90 */}
              <HeadingInput
                // label=" ސުރުޚީ"
                name="heading"
                id="heading"
                title="Short Heading"
                type="text"
                placeholder="ކުރު ސުރުޚީ"
                className="h-16 leading-10 text-xl font-mv-typewriter-bold"
                // className="h-16 leading-10 text-3xl font-mv-waheed"
                maxLength={90}
                component={TextareaAutosize}
                onInput={(event: BaseSyntheticEvent) => {
                  translateToThaana(event);
                  setFieldValue("latinHeading", thaanaToLatin(event.target.value));
                  setFieldValue("slug", sluggify(thaanaToLatin(event.target.value)));
                }}
              />
            </div>
            {/* Latin Heading */}
            <div className="mb-8">
              <LatinHeading
                title="Latin Heading"
                name="latinHeading"
                className="h-5"
                type="textarea"
                placeholder="Latin Heading"
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
                component={TextareaAutosize}
                className="h-16 leading-10 text-lg font-mv-typewriter"
                onInput={(event: BaseSyntheticEvent) => {
                  translateToThaana(event);
                }}
              />
            </div>
            <div className="mb-1">
              <HeadingHighlights
                title="Highlight"
                name="highlights"
                id="highlights"
                type="text"
                component={TextareaAutosize}
                placeholder="ހައިލައިޓްސް"
                className="h-16 leading-10 text-lg font-mv-typewriter"
                onInput={(event: BaseSyntheticEvent) => {
                  translateToThaana(event);
                }}
              />
            </div>
          </div>

          <PostEditor autoCapitalize document={document ? document : {}} onChange={documentChangeHandler}></PostEditor>
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
        values={values ? values : []}
        onSubmit={handleSubmit}
        show={showSettings}
        onClose={(): void => setShowSettings(!showSettings)}
        tags={tags ? tags : []}
        authors={authors ? authors : []}
        mode={mode}
        showAuthors={values.showAuthors}
        submitForReview={submitForReview}
        setStatus={(value: string) => setFieldValue("status", value)}
      />
    </Form>
  );
};

// categoryId: Yup.string().required("required"),
const validationSchema = Yup.object().shape({
  headingDetailed: Yup.string().required("required"),
  categoryId: Yup.number().required("required"),
  editorComment: Yup.string().when("status", {
    is: "rejected",
    then: Yup.string().required("required"),
  }),
});

const CreateTagForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: ({ post, user }) => ({
    id: (post && post?.id) || null,
    slug: (post && post.slug) || "",
    heading: (post && post.heading) || null,
    headingDetailed: (post && post.headingDetailed) || "",
    latinHeading: (post && post.latinHeading) || "",
    leadText: (post && post.leadText) || "",
    highlights: (post && post.highlights) || "",
    featuredMedia: (post && post.featuredMedia) || "",
    locationId: (post && post.locationId) || "",
    categoryId: (post && post.categoryId) || "",
    topicId: (post && post.topicId) || "",
    tags: (post && post.tags?.map((tag: { id: number }) => ({ id: tag?.id }))) || [],
    authors: (post && post.authors?.map((author: { id: number }) => ({ id: author?.id }))) || [
      { id: Number(user?.id) },
    ],
    showAuthors: (post && post.showAuthors) || true,
    status: (post && post.status) || "draft",
    content: (post && post.content) || [
      {
        type: "paragraph",
        id: nanoid(10),
        children: [
          {
            text: "",
          },
        ],
      },
    ],
    createdAt: (post && post.createdAt && new Date(post.createdAt).toISOString().slice(0, 16)) || null,
    scheduledAt: (post && post.scheduledAt && new Date(post.scheduledAt).toISOString().slice(0, 16)) || null,
    publishedAt: (post && post.publishedAt && new Date(post.publishedAt).toISOString().slice(0, 16)) || null,
    editorComment: (post && post.editorComment) || "",
    editedBy: (post && post.editedBy) || null,
    // tag releated stuff
    // headingDetailed:"",

    // leadText:"",
    // latinHeading: "",
    // highlights: "",
    // authors: [1],
    // layout: "default",
    // topicId: null,
    // categoryId: null,
    // locationId: null,
    // slug: "",
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
