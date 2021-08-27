import { useAbility } from "@casl/react";
import { TrashIcon, PencilAltIcon } from "@heroicons/react/outline";
import { PencilIcon } from "@heroicons/react/solid";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";

import client from "../../api/client";
import { MainLayout } from "../../components";
import { AbilityContext } from "../../components/auth/can";

import { tableStyle } from "@utils";

const PostIndex = (props: any) => {
  const ability = useAbility(AbilityContext);

  const router = useRouter();
  const [session] = useSession();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(15);

  const tabs = [
    { name: "All", slug: "all" },
    { name: "My Desk", slug: "draft" },
    { name: "Copy Desk", slug: "copydesk" },
    { name: "Rejected", slug: "rejected" },
    { name: "Bank", slug: "bank" },
    { name: "Scheduled", slug: "scheduled" },
    { name: "Published", slug: "published" },
  ];

  const handlePageChange = (page: number) => {
    router.push({
      pathname: "/posts",
      query: { type, page },
    });
    fetchPosts(page, type);
  };

  const handlePerRowsChange = async (take: number, page: number) => {
    setLoading(true);

    const response = await client.get(`/posts?type=${type}}&page=${page}&take=${perPage}`, {
      headers: { Authorization: "Bearer " + session?.access_token },
    });

    setData(response.data.data);
    setPerPage(take);
    setLoading(false);
  };

  const fetchPosts = async (page: number, type: string) => {
    setLoading(true);
    const response = await client.get(`/posts?type=${type}&page=${page}`, {
      headers: { Authorization: "Bearer " + session?.access_token },
    });
    setData(response.data.data);
    setTotalRows(response.data.totalCount);
    setLoading(false);
  };

  const columns = useMemo(
    () => [
      {
        name: "",
        button: true,
        width: "100px",
        // eslint-disable-next-line react/display-name
        cell: (row: any) => (
          <div data-tag="allowRowEvents">
            {row.status === "draft" &&
              row.authors.some((user: any) => user.id === Number(session?.user.id)) &&
              ability.can("create", "Post") && (
                <Link href={`/posts/edit/${row.nanoid}`} passHref>
                  <button
                    type="button"
                    className="mr-3 inline-flex items-center px-3 py-2  border-gray-300 rounded-md hover:shadow-sm text-xs font-medium text-gray-700  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                  >
                    <PencilAltIcon className="h-5 w-5 text-gray-400 hover:text-indigo-600" />
                  </button>
                </Link>
              )}
            {row.status === "rejected" &&
              row.authors.some((user: any) => user.id === Number(session?.user.id)) &&
              ability.can("create", "Post") && (
                <Link href={`/posts/edit/${row.nanoid}`} passHref>
                  <button
                    type="button"
                    className="mr-3 inline-flex items-center px-3 py-2  border-gray-300 rounded-md hover:shadow-sm text-xs font-medium text-gray-700  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                  >
                    <PencilAltIcon className="h-5 w-5 text-gray-400 hover:text-indigo-600" />
                  </button>
                </Link>
              )}

            {row.status === "review" && ability.can("moderate", "Post") && (
              <Link href={`/posts/edit/${row.nanoid}`} passHref>
                <button
                  type="button"
                  className="mr-3 inline-flex items-center px-3 py-2  border-gray-300 rounded-md hover:shadow-sm text-xs font-medium text-gray-700  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                >
                  <PencilAltIcon className="h-5 w-5 text-gray-400 hover:text-indigo-600" />
                </button>
              </Link>
            )}

            {/* <button
              type="button"
              className="inline-flex items-center px-3 py-2  border-gray-300 rounded-md hover:shadow-sm text-xs font-medium text-gray-700  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-red"
            >
              <TrashIcon className="h-5 w-5 text-gray-400 hover:text-red" />
            </button> */}
          </div>
        ),
      },
      {
        name: "Updated At",
        sortable: true,
        maxWidth: "200px",
        selector: (row: any) => format(new Date(row.updatedAt), "dd-MM-yyyy (hh:mm)"),
      },
      {
        name: "Created At",
        sortable: true,
        maxWidth: "200px",
        selector: (row: any) => format(new Date(row.createdAt), "dd-MM-yyyy (hh:mm)"),
      },

      {
        name: "Status",
        sortable: true,
        maxWidth: "20px",
        center: true,
        selector: (row: any) => row.status,
      },
      {
        name: "Category",
        sortable: true,
        center: true,
        maxWidth: "200px",
        // eslint-disable-next-line react/display-name
        cell: (row: any) => row.category.nameEn,
      },

      {
        name: "Editor",
        sortable: true,
        center: true,
        maxWidth: "200px",
        // eslint-disable-next-line react/display-name
        cell: (row: any) => (
          <div data-tag="allowRowEvents" className="w-full">
            {row.editor ? <div>{row.editor?.nameEn}</div> : "Not Assigned"}
          </div>
        ),
      },
      {
        name: "Authors",
        sortable: true,
        center: true,
        maxWidth: "200px",
        // eslint-disable-next-line react/display-name
        cell: (row: any) => (
          <div data-tag="allowRowEvents" className="w-full">
            <ul>
              {row.authors?.map((author: any) => (
                <li className="list-none text-xs" key={`author${author.id_}`}>
                  {author.nameEn}
                </li>
              ))}
            </ul>
          </div>
        ),
      },
      {
        name: "Heading",
        sortable: true,
        right: true,
        // eslint-disable-next-line react/display-name
        cell: (row: any) => (
          <div data-tag="allowRowEvents" className="w-full">
            <div className="text-right text-gray-800 font-mv-typewriter-bold tracking-normal text-md text-base">
              {/* <Link href={`/posts/edit/${row.nanoid}`} passHref> */}
              <a href="#" className="hover:text-gray-800">
                {row.headingDetailed}
              </a>
              {/* </Link> */}
            </div>
          </div>
        ),
      },
      {
        name: "Id",
        sortable: true,
        maxWidth: "100px",
        center: true,
        selector: (row: any) => row.id,
      },
    ],
    []
  );
  const page = router.query?.page || 1;
  const type = (router.query?.type as string) || "all";

  useEffect(() => {
    fetchPosts(Number(page), type);
  }, []);

  return (
    <MainLayout>
      <div className="space-y-6 mt-4 px-10">
        <main className="pt-8 bg-white shadow py-5 sm:rounded-lg">
          <div className="px-6">
            <h1 className="text-lg leading-6 font-medium text-gray-900">Posts Manager</h1>
          </div>

          <div className="border-b border-gray-200 px-6">
            <nav className="-mb-px flex justify-between">
              <div className="-mb-px flex space-x-8 " aria-label="Tabs">
                {tabs.map((tab: any, idx: number) => (
                  <a
                    href={`/posts?type=${tab.slug}`}
                    key={`tab_${idx}`}
                    className={`border-transparent  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      tab.slug === type
                        ? "border-purple-500 text-purple-600"
                        : "text-gray-500 hover:text-gray-700 hover:border-gray-200"
                    }`}
                  >
                    {tab.name}
                  </a>
                ))}
              </div>
              <div className="flex just-center items-center">
                <Link href="/posts/create" passHref>
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
              </div>
            </nav>
          </div>

          {/* data-table */}
          <div className="w-full mx-auto">
            <div className="flex flex-col px-4">
              <DataTable
                columns={columns}
                data={data}
                customStyles={tableStyle}
                striped={true}
                highlightOnHover={true}
                dense={true}
                progressPending={loading}
                pagination
                paginationServer
                paginationPerPage={15}
                paginationTotalRows={totalRows}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                paginationDefaultPage={Number(page)}
                paginationComponentOptions={{ noRowsPerPage: true }}
              />
            </div>
          </div>
          {/* eof-data-table */}
        </main>
      </div>
    </MainLayout>
  );
};

PostIndex.auth = true;
export default PostIndex;
