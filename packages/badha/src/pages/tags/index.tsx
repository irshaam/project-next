import { TrashIcon, PencilAltIcon } from "@heroicons/react/outline";
import { PencilIcon } from "@heroicons/react/solid";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { route } from "next/dist/next-server/server/router";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import styled from "styled-components";

import { MainLayout } from "../../components";
import DeleteModal from "../../components/DeleteModal";

import client from "@/api/client";
import { tableStyle } from "@utils";
export const getServerSideProps = async ({ req, query }) => {
  const session = await getSession({ req });

  const tabs = ["draft", "review", "rejected", "approved", "scheduled", "published", "unpublished", "archived"];

  const type = query.type || "all";

  const currentPage = query.page || 1;

  // const users = await getUsers();
  let tags = [];
  let tagTypes = [];
  let headers = {};

  if (session) {
    headers = { Authorization: `Bearer ${session.access_token}` };
  }

  try {
    const { data } = await client.get("/tags", { params: { type }, headers });
    tags = data;
  } catch (e) {
    console.log(e);

    return {};
  }
  try {
    const { data } = await client.get("/tag-types", { headers });
    tagTypes = data;
  } catch (e) {
    console.log(e);

    return {};
  }

  return {
    props: {
      tags,
      tagTypes,
    }, // will be passed to the page component as props
  };
};

const TextField = styled.input`
  // height: 32px;
  // width: 200px;
  // border-radius: 3px;
  // border-top-left-radius: 5px;
  // border-bottom-left-radius: 5px;
  // border-top-right-radius: 0;
  // border-bottom-right-radius: 0;
  // border: 1px solid #e5e5e5;
  // padding: 0 32px 0 16px;

  // &:hover {
  //   cursor: pointer;
  // }
`;

// const ClearButton = styled(Button)`
//   border-top-left-radius: 0;
//   border-bottom-left-radius: 0;
//   border-top-right-radius: 5px;
//   border-bottom-right-radius: 5px;
//   height: 34px;
//   width: 32px;
//   text-align: center;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <input
      id="search"
      type="search"
      placeholder="Filter By Name"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
      style={{ paddingTop: "0.30rem", paddingBottom: "0.34rem" }}
      className=" relative bg-transparent w-full rounded-md focus:ring-4 border-2 focus:border-red focus:border-opacity-20 focus:ring-red focus:ring-opacity-10 border-black border-opacity-10	 placeholder-gray-400"
    />
    {/* <ClearButton type="button" onClick={onClear}>
      X
    </ClearButton> */}
  </>
);

// import CreateMediaForm from "./form";
const TagsIndex = ({ tagTypes, tags }: { tagTypes: any; tags: any }) => {
  const router = useRouter();
  // const submit = () => {
  //   const response = client.post("/users/create");
  // };

  const { query } = router;
  const page = query?.page || 1;
  const type = query?.type || "all";

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const filteredItems = tags.filter(
    (item) => item.nameEn && item.nameEn.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent onFilter={(e) => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
    );
  }, [filterText, resetPaginationToggle]);

  const handlePageChange = (page: number) => {
    router.push({
      pathname: "/tags",
      query: { type, page },
    });
  };

  const columns = useMemo(
    () => [
      {
        name: "Id",
        sortable: true,
        selector: (row: any) => row.id,
      },
      {
        name: "Name En",
        sortable: true,
        // eslint-disable-next-line react/display-name
        cell: (row: any) => (
          <div data-tag="allowRowEvents" className="w-full">
            <div className="whitespace-nowrap text-gray-600  tracking-normal text-md">{row.nameEn}</div>
          </div>
        ),
      },
      {
        name: "Slug",
        selector: (row: any) => row.slug,
        sortable: true,
      },

      {
        name: "Type",
        selector: (row: any) => row.tagType.name,
        sortable: true,
      },
      {
        name: "Name",
        right: true,

        // selector: "name",
        sortable: true,
        // eslint-disable-next-line react/display-name
        cell: (row: any) => (
          <div data-tag="allowRowEvents" className="w-full">
            <div className="text-right whitespace-nowrap text-gray-600 font-mv-typewriter-bold tracking-normal text-md">
              {row.name}
            </div>
          </div>
        ),
      },
      {
        name: "",
        button: true,
        width: "180px",
        // eslint-disable-next-line react/display-name
        cell: (row: any) => (
          <div className="">
            <Link href={`/tags/edit/${row.id}`} passHref>
              <button
                type="button"
                className="mr-3 inline-flex items-center px-3 py-2  border-gray-300 rounded-md hover:shadow-sm text-xs font-medium text-gray-700  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
              >
                <PencilAltIcon className="h-5 w-5 text-gray-400 hover:text-indigo-600" />
              </button>
            </Link>
            <button
              type="button"
              className="inline-flex items-center px-3 py-2  border-gray-300 rounded-md hover:shadow-sm text-xs font-medium text-gray-700  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-red"
            >
              <TrashIcon className="h-5 w-5 text-gray-400 hover:text-red" />
            </button>
          </div>
        ),
      },
    ],
    []
  );
  //
  return (
    <MainLayout>
      {/* !-- Page heading --> */}

      <div className="space-y-6 mt-4 px-10">
        <main className="pt-8 bg-white shadow py-5 sm:rounded-lg">
          <div className="px-6">
            <h1 className="text-lg leading-6 font-medium text-gray-900">Tags Manager</h1>
          </div>

          <div className="border-b border-gray-200 px-6">
            <nav className="-mb-px flex justify-between">
              <div className="-mb-px flex space-x-8 " aria-label="Tabs">
                {/* Current: "border-purple-500 text-purple-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200" */}

                <Link href="/tags?type=all" passHref>
                  <a
                    href="#"
                    className={`border-transparent  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      type === "all"
                        ? "border-purple-500 text-purple-600"
                        : "text-gray-500 hover:text-gray-700 hover:border-gray-200"
                    }`}
                  >
                    All
                  </a>
                </Link>

                {tagTypes.map((tagType: any) => (
                  <a
                    key={`tag_types_${tagType.id}`}
                    href={`tags?type=${tagType.slug}`}
                    className={`border-transparent  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      tagType.slug === type
                        ? "border-purple-500 text-purple-600"
                        : "text-gray-500 hover:text-gray-700 hover:border-gray-200"
                    }`}
                  >
                    {tagType.name}
                  </a>
                ))}
              </div>
              <div className="flex just-center items-center">
                <Link href="/tags/create" passHref>
                  <span className="hidden sm:block">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500"
                    >
                      <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                      Create
                    </button>
                  </span>
                </Link>

                <div className="ml-2">{subHeaderComponentMemo}</div>
              </div>
            </nav>
          </div>
          <div className="w-full mx-auto">
            <div className="flex flex-col px-4">
              <DataTable
                columns={columns}
                // data={tags}
                data={filteredItems}
                striped={true}
                highlightOnHover={true}
                dense={true}
                pagination={true}
                paginationPerPage={15}
                onChangePage={handlePageChange}
                paginationDefaultPage={Number(page)}
                paginationComponentOptions={{ noRowsPerPage: true }}
                // subHeader
                // subHeaderComponent={subHeaderComponentMemo}
                customStyles={tableStyle}
              />

              {/* <DeleteModal  /> */}
            </div>
          </div>
        </main>
      </div>
    </MainLayout>
  );
};

TagsIndex.auth = true;
export default TagsIndex;
