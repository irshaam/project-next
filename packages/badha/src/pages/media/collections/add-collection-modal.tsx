/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from "@headlessui/react";
import { withFormik, FormikProps, Form } from "formik";
import { Fragment } from "react";
import * as Yup from "yup";

import { TextInput, ThaanaInput, Select } from "@/components/form";

interface FormValues {
  tags?: number[];
}

interface MyFormProps {
  tags: any;
  open: boolean;
  onSubmit(formData: FormValues): void;
  onClose(): void;
}

const InnerForm = (props: FormikProps<FormValues> & MyFormProps) => {
  const { open, tags } = props;

  const setOpen = () => {
    props.onClose();
  };
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
                      <div className="w-full flex items-center flex-col">
                        <div className="w-full   mb-6">
                          <ThaanaInput label="ކަލެކްޝަން " name="name" type="text" placeholder="..." />
                        </div>
                        <div className="w-full   mb-6">
                          <TextInput
                            // onChange={(e: any) => setFieldValue("slug", sluggify(e.target.value))}
                            label="Collection Name"
                            name="nameEn"
                            type="text"
                            placeholder="..."
                          />
                        </div>
                        <div className="w-full   mb-6">
                          <Select
                            className="z-50"
                            label="Tags"
                            name="tags"
                            id="tags"
                            placeholder="..."
                            options={tags}
                            isMulti={true}
                          />
                        </div>

                        <div className="pt-8 w-full">
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
                {/* <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={setOpen}
                >
                  Deactivate
                </button> */}
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

const AddMediaCollectionModal = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: (props: any) => ({
    tags: [],
    name: "",
    nameEn: "",
  }),
  validationSchema,
  handleSubmit: async (values, formikBag) => {
    formikBag.props.onSubmit({ ...values });
    formikBag.setSubmitting(false);
  },
})(InnerForm);

export default AddMediaCollectionModal;
