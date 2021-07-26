import MainLayout from "../../components/layouts/MainLayout";

const Posts = () => {
  return (
    <MainLayout>
      {/* !-- Page heading --> */}
      <header className="py-8">
        <div className="max-w-full flex mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Posts</h1>
          </div>
          <div className="mt-5 flex xl:mt-0 xl:ml-4">
            <span className="hidden sm:block">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500"
              >
                {/* <!-- Heroicon name: solid/pencil --> */}
                <svg
                  className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Create
              </button>
            </span>

            <span className="hidden sm:block ml-3">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500"
              >
                {/* <!-- Heroicon name: solid/link --> */}
                <svg
                  className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                    clipRule="evenodd"
                  />
                </svg>
                View
              </button>
            </span>

            <span className="sm:ml-3 relative z-0">
              {/* <!--
            Custom select controls like this require a considerable amount of JS to implement from scratch. We're planning
            to build some low-level libraries to make this easier with popular frameworks like React, Vue, and even Alpine.js
            in the near future, but in the mean time we recommend these reference guides when building your implementation:

            https://www.w3.org/TR/wai-aria-practices/#Listbox
            https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html
          --> */}
              <div>
                <label id="listbox-label" className="sr-only">
                  Change published status
                </label>
                <div className="relative">
                  <div className="inline-flex shadow-sm rounded-md divide-x divide-purple-600">
                    <div className="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-purple-600">
                      <div className="relative inline-flex items-center bg-purple-500 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white">
                        {/* <!-- Heroicon name: solid/check --> */}
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p className="ml-2.5 text-sm font-medium">Published</p>
                      </div>
                      <button
                        type="button"
                        className="relative inline-flex items-center bg-purple-500 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-purple-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500"
                        aria-haspopup="listbox"
                        aria-expanded="true"
                        aria-labelledby="listbox-label"
                      >
                        <span className="sr-only">Change published status</span>
                        {/* <!-- Heroicon name: solid/chevron-down --> */}
                        <svg
                          className="h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* <!--
                Select popover, show/hide based on select state.

                Entering: ""
                  From: ""
                  To: ""
                Leaving: "transition ease-in duration-100"
                  From: "opacity-100"
                  To: "opacity-0"
              --> */}
                  <ul
                    className="origin-top-right absolute left-0 mt-2 -mr-1 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none sm:left-auto sm:right-0"
                    tabIndex={-1}
                    role="listbox"
                    aria-labelledby="listbox-label"
                    aria-activedescendant="listbox-option-0"
                  >
                    {/* <!--
                  Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

                  Highlighted: "text-white bg-purple-500", Not Highlighted: "text-gray-900"
                --> */}
                    <li
                      className="text-gray-900 cursor-default select-none relative p-4 text-sm"
                      id="listbox-option-0"
                      role="option"
                    >
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          {/* <!-- Selected: "font-semibold", Not Selected: "font-normal" --> */}
                          <p className="font-normal">Published</p>
                          {/* <!--
                        Checkmark, only display for selected option.

                        Highlighted: "text-white", Not Highlighted: "text-purple-500"
                      --> */}
                          <span className="text-purple-500">
                            {/* <!-- Heroicon name: solid/check --> */}
                            <svg
                              className="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                        {/* <!-- Highlighted: "text-purple-200", Not Highlighted: "text-gray-500" --> */}
                        <p className="text-gray-500 mt-2">This job posting can be viewed by anyone who has the link.</p>
                      </div>
                    </li>

                    {/* <!-- More items... --> */}
                  </ul>
                </div>
              </div>
            </span>

            {/* <!-- Dropdown --> */}
            <span className="ml-3 relative sm:hidden">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                id="mobile-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                More
                {/* <!-- Heroicon name: solid/chevron-down --> */}
                <svg
                  className="-mr-1 ml-2 h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {/*
          <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-200"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          --> */}
              <div
                className="origin-top-right absolute right-0 mt-2 -mr-1 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="mobile-menu-button"
                tabIndex={-1}
              >
                {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}

                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex={-1}
                  id="mobile-menu-item-1"
                >
                  View
                </a>
              </div>
            </span>
          </div>
        </div>
      </header>
    </MainLayout>
  );
};

export default Posts;
