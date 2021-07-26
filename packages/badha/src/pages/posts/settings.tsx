import { Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { Fragment } from "react";

import TextInput from "../../components/form/input-text";
import ThaanaInput from "../../components/form/input-thaana";
import SingleSelect from "../../components/form/single-select";

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
          <form className="h-full w-full divide-y divide-gray-200 flex flex-col bg-secondry shadow-xl">
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
                      className="bg-transparent rounded-md text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <span className="sr-only">Close panel</span>
                      <XIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="px-4 divide-y divide-gray-200 sm:px-6">
                  <div className="space-y-6 pt-6 pb-5">
                    <div>Authors</div>
                    <div>Feature this post</div>
                    <div>Main Category</div>
                    <div>Authors</div>
                    <div>Show Authors</div>
                    <div>Locations</div>
                    <div>Type</div>

                    <div>
                      <label htmlFor="project_name" className="block text-sm font-medium text-gray-900">
                        Project name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="project_name"
                          id="project_name"
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                        Description
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="description"
                          name="description"
                          rows={4}
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 px-4 py-4 flex justify-end">
              <button
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </form>
        </Transition.Child>
      </div>
    </Transition.Root>
  );
};

export default PostSettings;
