import { Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { Field } from "formik";
import { Fragment } from "react";

import TextInput from "../../../components/form/input-text";
import ThaanaInput from "../../../components/form/input-thaana";
import Select from "../../../components/form/select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const PostSettings = (props) => {
  const { show, onClose } = props;
  const { tags } = props;
  const handleClose = () => {
    onClose();
  };

  return (
    // <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">

    <Transition.Root show={show} as={Fragment}>
      <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex" style={{ width: "350px" }}>
        <Transition.Child
          as={Fragment}
          enter="transform transition ease-in-out duration-500 sm:duration-700"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-500 sm:duration-700"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          {/* bg-secondry */}
          <div className="h-full w-full divide-y divide-gray-200 flex flex-col bg-white  shadow-xl">
            <div className="flex-1 h-0 overflow-y-auto">
              <div className="py-6 px-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-black" id="slide-over-title">
                    Post Settings
                  </h2>
                  <div className="ml-3 h-7 flex items-center">
                    <button
                      onClick={handleClose}
                      type="button"
                      className={`bg-transparent rounded-md  focus:outline-none focus:ring-2 focus:ring-white ${
                        show ? "text-black hover:text-red " : "text-white hover:text-red"
                      }`}
                    >
                      <span className="sr-only">Close panel</span>
                      <XIcon className="h-6 w-6 fill-current" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="px-4 divide-y divide-gray-200 sm:px-6">
                  <div className="space-y-6 pt-6 pb-5">
                    {/* <div>
                      <Select
                        label="Status"
                        name="status"
                        placeholder="..."
                        options={[
                          { id: "draft", name: "Draft" },
                          { id: "review", name: "Review" },
                        ]}
                        isMulti={false}
                      />
                    </div> */}
                    {/* <div>
                      <TextInput
                        label="Publish date"
                        name="publishedAt"
                        type="datetime-local"
                        placeholder="..."
                        className="font-mv-typewriter-bold"
                      />
                    </div> */}

                    {/* <div>
                      <Select label="Topic" name="topicId" placeholder="..." options={tags} isMulti={false} />
                    </div> */}

                    <div>
                      <Select
                        label="Main Category"
                        name="categoryId"
                        placeholder="..."
                        options={tags}
                        isMulti={false}
                      />
                    </div>

                    {/* <div>
                      <Select label="Location" name="locationId" placeholder="..." options={tags} isMulti={false} />
                    </div> */}
                    {/* <div>
                      <Select
                        label="Authors"
                        name="authors"
                        placeholder="..."
                        options={[
                          {
                            id: 1,
                            name: "Irshaam",
                          },
                        ]}
                        isMulti={true}
                      />
                    </div> */}
                    {/* <div className="flex items-center">
                      <Field
                        name="hideAuthor"
                        id="acceptTerms1"
                        class="focus:ring-rk-dark h-5  w-5 text-rk-dark border-gray-300 rounded checkbox mr-4"
                        // class="mr-2 leading-tight h-1"
                        type="checkbox"
                      />
                      <div>Hide Authors Details</div>
                    </div>
                    <div>
                      <Select label="Tags" name="tags" placeholder="..." options={tags} isMulti={true} />
                    </div> */}

                    {/* <div>
                      <div>
                        <Select
                          label="Layout"
                          name="layout"
                          placeholder="..."
                          options={[
                            {
                              id: "default",
                              name: "Default",
                            },
                            {
                              id: "story",
                              name: "Story",
                            },
                            {
                              id: "report",
                              name: "Report",
                            },
                          ]}
                          isMulti={false}
                        />
                      </div>
                    </div> */}
                    {/*
                    <div className="flex items-center">
                      <Field
                        name="hideAuthor"
                        id="acceptTerms1"
                        class="focus:ring-rk-dark h-5  w-5 text-rk-dark border-gray-300 rounded checkbox mr-4"
                        // class="mr-2 leading-tight h-1"
                        type="checkbox"
                      />
                      <div>Feature this post</div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 px-4 py-4 flex justify-end">
              <button
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit for Review
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  props.onSubmit();
                }}
                className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition.Root>
  );
};

export default PostSettings;
