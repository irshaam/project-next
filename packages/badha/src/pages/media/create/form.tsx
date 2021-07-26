import { withFormik, FormikProps, Form, Field, ErrorMessage, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import * as Yup from "yup";

import TextInput from "../../../components/form/input-text";
import ThaanaInput from "../../../components/form/input-thaana";
import Select from "../../../components/form/select";
import { sluggify } from "../../../utils/slugify";
interface FormValues {
  files: any;
  caption?: string;
  caption_en?: string;
  hasWatermark?: boolean;
  collection?: number | string;
  tags?: number[];
}

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const InnerForm = (props: FormikProps<FormValues> & MyFormProps) => {
  const { setFieldValue, tags, values, touched, errors } = props;
  // const { getRootProps, getInputProps, acceptedFiles } = useDropzone({ noDrag: true });
  // const files = acceptedFiles.map((file) => <li key={file.path}>{file.path}</li>);

  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: true,
    onDrop: (acceptedFiles) => {
      // console.log(acceptedFiles);
      // acceptedFiles.forEach((file) => {
      //   const reader = new FileReader();

      //   reader.onabort = () => console.log("file reading was aborted");
      //   reader.onerror = () => console.log("file reading has failed");
      //   reader.onload = () => {
      //     // Do whatever you want with the file contents
      //     const binaryStr = reader.result;
      //     console.log("bin", binaryStr);
      //     setFieldValue("files", values.files.concat(binaryStr));
      //   };
      //   reader.readAsArrayBuffer(file);

      //   console.log("read", reader);
      // });

      setFieldValue("files", acceptedFiles);
      // setFieldValue("files", acceptedFiles[0]);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );
  return (
    <Form autoComplete="off" autoCorrect="off" autoCapitalize="off" noValidate>
      <div className="max-w-3xl mx-auto">
        <div className="space-y-1">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Media Information</h3>
          {/* <p className="max-w-2xl text-sm text-gray-500">Use a permanent address where you can receive mail.</p> */}
        </div>

        <div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {/* name_en */}
            <div className="sm:col-span-3">
              <TextInput
                // onChange={(e: any) => setFieldValue("slug", sluggify(e.target.value))}
                label="Collection Name"
                name="name_en"
                type="text"
                placeholder="..."
              />
            </div>
            <div className="sm:col-span-3">
              <ThaanaInput label="ކަލެކްޝަން " name="name" type="text" placeholder="..." />
            </div>

            {/* slug */}
            {/* <div className="sm:col-span-3">
              <TextInput label="Slug" name="slug" type="text" placeholder="..." className="font-mv-typewriter-bold" />
            </div> */}

            {/* parent tag */}
            <div className="sm:col-span-6">
              <Select label="Tags" name="tags" id="tags" placeholder="..." options={tags} isMulti={true} />
            </div>

            {/* description */}
            <div className="sm:col-span-6">
              <TextInput label="Caption" name="captionEn" as="textarea" placeholder="..." />
            </div>
            <div className="sm:col-span-6">
              <ThaanaInput label="ކެޕްޝަން" name="caption" as="textarea" placeholder="..." />
            </div>
            <div className="sm:col-span-6">
              <section className="container">
                <div
                  {...getRootProps({
                    className: `dropzone mt-1 flex justify-center px-6 pt-5 pb-6  border-dashed rounded-md  focus:ring-4 border-2 focus:border-red focus:border-opacity-20 focus:ring-red focus:ring-opacity-10 ${
                      touched.files && errors.files
                        ? " border-red text-opacity-50"
                        : "border-black border-opacity-10 placeholder-gray-400 "
                    }`,
                  })}
                >
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input {...getInputProps()} name="files" />
                        {/* <input id="file-upload" name="file-upload" type="file" className="sr-only" /> */}
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  {/* {errors.files && touched.files ? <div>{errors.files}</div> : null} */}
                </div>
                <ErrorMessage name="files" className="mt-2 text-sm text-red" component="p" />

                <aside style={thumbsContainer}>{thumbs}</aside>
              </section>
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
  tags: any;
  onSubmit(formData: FormValues): void;
}

const validationSchema = Yup.object().shape({
  files: Yup.array().min(1),
  // name: Yup.string().required("required"),
});

const CreateMediaForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: (props) => ({
    files: [],
    caption: "",
    caption_en: "",
    hasWatermark: "",
    collection: "",
    tags: [],
    slug: "",
    name: "",
    name_en: "",
  }),
  validationSchema,
  handleSubmit: async (values, formikBag) => {
    // console.log(values);
    formikBag.props.onSubmit({ ...values });
    formikBag.setSubmitting(false);
  },
})(InnerForm);

export default CreateMediaForm;
