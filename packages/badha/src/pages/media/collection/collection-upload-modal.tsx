/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from "@headlessui/react";
import { withFormik, FormikProps, Form } from "formik";
import { Fragment, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import * as Yup from "yup";

interface FormValues {}
interface MyFormProps {
  open: boolean;
  onSubmit(formData: FormValues): void;
  onClose(): void;
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
  const { open } = props;

  const setOpen = () => {
    props.onClose();
  };

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
      // });s
      // setFieldValue("files", acceptedFiles);
      // setFieldValue("files", acceptedFiles[0]);
      // setFiles();
      // acceptedFiles.map((file) =>
      //   Object.assign(file, {
      //     preview: URL.createObjectURL(file),
      //   })
      // )
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
    <Transition.Root show={open ? open : false} as={Fragment}>
      <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" open={open} onClose={setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    <div className="space-y-1">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Collection Information</h3>
                      {/* <p className="max-w-2xl text-sm text-gray-500">Use a permanent address where you can receive mail.</p> */}
                    </div>
                  </Dialog.Title>
                  <div className="mt-2">
                    <Form autoComplete="off" autoCorrect="off" autoCapitalize="off" noValidate>
                      <div className="max-w-3xl mx-auto">
                        <div>
                          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                              <section className="container">
                                <div
                                  {...getRootProps({
                                    className: `dropzone mt-1 flex justify-center px-6 pt-5 pb-6  border-dashed rounded-md  focus:ring-4 border-2 focus:border-red focus:border-opacity-20 focus:ring-red focus:ring-opacity-10 border-black border-opacity-10 placeholder-gray-400`,
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
                                {/* <ErrorMessage name="files" className="mt-2 text-sm text-red" component="p" /> */}

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
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={setOpen}
                >
                  Deactivate
                </button>
                {/* <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={setOpen}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button> */}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("required"),
  nameEn: Yup.string().required("required"),
});

const CollectionUploadModal = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: (props: any) => ({
    // tags: [],
    // name: "",
    // nameEn: "",
  }),
  validationSchema,
  handleSubmit: async (values, formikBag) => {
    formikBag.props.onSubmit({ ...values });
    formikBag.setSubmitting(false);
  },
})(InnerForm);

export default CollectionUploadModal;
