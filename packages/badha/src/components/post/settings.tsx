import { useAbility } from "@casl/react";
import { Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { Field } from "formik";
import { Fragment } from "react";
import SingleSelect from "react-select";

import { AbilityContext } from "../../components/auth/can";
import { ThaanaInput } from "../form";
import TextInput from "../form/input-text";
import Select from "../form/select";

import PostStatusFilter from "@/pages/posts/post-status-selector";

const PostSettings = (props: any) => {
  const ability = useAbility(AbilityContext);

  const { show, onClose, mode, authors, values, setStatus } = props;
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
                    {/* eof authors */}
                    <div>
                      {mode !== "draft" && (
                        <Field
                          as="select"
                          name="status"
                          className="w-full bg-white relative bg-transparent w-full rounded-md focus:ring-4 border-2 focus:border-red-next focus:border-opacity-20 focus:ring-red-next focus:ring-opacity-10"
                        >
                          <option value="review" disabled={mode !== "review"}>
                            Review
                          </option>
                          <option value="rejected">Reject</option>
                          <option value="approved">Approve</option>
                          <option value="scheduled">Schedule</option>
                          <option value="published">Publish</option>
                          {/* <option value="unpublish">Unpublish</option> */}
                        </Field>
                      )}
                    </div>

                    {values.status === "rejected" && ability.can("moderate", "Post") && (
                      <div className="mb-10 w-full">
                        <ThaanaInput label="އެޑިޓަރުގެ ކޮމެންޓް" name="editorComment" as="textarea" placeholder="..." />
                      </div>
                    )}
                    {values.status === "scheduled" && (
                      <div>
                        <TextInput
                          label="Schedule Date"
                          name="scheduledAt"
                          id="scheduledAt"
                          type="datetime-local"
                          placeholder="..."
                        />
                      </div>
                    )}

                    {values.status === "published" && (
                      <div>
                        <TextInput
                          label="Publish Date"
                          name="publishedAt"
                          id="publishedAt"
                          type="datetime-local"
                          placeholder="..."
                        />
                      </div>
                    )}

                    <div>
                      <TextInput
                        label="Created Date"
                        name="createdAt"
                        id="createdAt"
                        type="datetime-local"
                        placeholder="..."
                      />
                    </div>
                    <div>
                      {tags && (
                        <Select
                          label="Main Category"
                          name="categoryId"
                          id="categoryId"
                          placeholder="..."
                          options={tags.filter((tag: any) => tag.tagType?.slug === "category")}
                          isMulti={false}
                        />
                      )}
                    </div>

                    {/* tags */}
                    <div>
                      {tags && (
                        <Select
                          label="Tags"
                          name="tags"
                          id="tags"
                          placeholder="..."
                          options={tags.filter(
                            (tag: any) => tag.id !== values.topicId || values.categoryId || values.locationID
                          )}
                          isMulti={true}
                        />
                      )}
                    </div>

                    <div>
                      {tags && (
                        <Select
                          label="Topic"
                          name="topicId"
                          id="topicId"
                          options={tags.filter((tag: any) => tag.tagType?.slug === "topic")}
                          placeholder="..."
                          isMulti={false}
                        />
                      )}
                    </div>

                    {/* location */}
                    <div>
                      {tags && (
                        <Select
                          label="Location"
                          name="locationId"
                          placeholder="..."
                          options={tags.filter((tag: any) => tag.tagType?.slug === "location")}
                          isMulti={false}
                        />
                      )}
                    </div>

                    {/* author */}
                    <div>
                      <Select
                        label="Authors"
                        name="authors"
                        id="authors"
                        placeholder="..."
                        options={authors}
                        isMulti={true}
                      />
                      <div className="flex items-center mt-3">
                        <Field
                          name="showAuthors"
                          id="showAuthors"
                          class="focus:ring-rk-dark h-5  w-5 text-rk-dark border-gray-300 rounded checkbox mr-4"
                          type="checkbox"
                        />
                        <div className="text-sm font-medium text-light-gray">Show authors</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*
                    <div>
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
                    </div>







                    <div className="flex items-center">
                      <Field
                        name="showAuthors"
                        id="showAuthors"
                        class="focus:ring-rk-dark h-5  w-5 text-rk-dark border-gray-300 rounded checkbox mr-4"
                        // class="mr-2 leading-tight h-1"
                        type="checkbox"
                      />
                      <div>Hide Authors Details</div>
                    </div>
                    <div>
                      <Select label="Tags" name="tags" placeholder="..." options={tags} isMulti={true} />
                    </div>



                    <div className="flex items-center">
                      <Field
                        name="isFeatured"
                        id="isFeatured"
                        class="focus:ring-rk-dark h-5  w-5 text-rk-dark border-gray-300 rounded checkbox mr-4"
                        // class="mr-2 leading-tight h-1"
                        type="checkbox"
                      />
                      <div>Feature this post</div>
                    </div>
                  </div>
                </div>
              </div>*/}
            </div>

            <div className="flex-shrink-0 px-4 py-4 flex justify-end">
              {mode === "draft" && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    props.submitForReview();
                  }}
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit for Review
                </button>
              )}

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  props.onSubmit();
                }}
                className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {mode === "create" ? "Create New" : "Save"}
              </button>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition.Root>
  );
};

export default PostSettings;
