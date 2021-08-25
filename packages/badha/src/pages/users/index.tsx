import { TrashIcon, PencilAltIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/outline";
import { PencilIcon } from "@heroicons/react/solid";
import { format } from "date-fns";
import { useSession } from "next-auth/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";

import { MainLayout } from "../../components";
import { imageLoader, tableStyle } from "../../utils";

import client from "@/api/client";

const UsersIndex = (props: any) => {
  const router = useRouter();
  const [session] = useSession();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(15);

  const handlePageChange = (page: number) => {
    router.push({
      pathname: "/users",
      query: { page },
    });
    fetchUsers(page);
  };

  const handlePerRowsChange = async (take: number, page: number) => {
    setLoading(true);

    const response = await client.get(`/users?page=${page}&take=${perPage}`, {
      headers: { Authorization: "Bearer " + session?.access_token },
    });

    setData(response.data.data);
    setPerPage(take);
    setLoading(false);
  };

  const fetchUsers = async (page: number) => {
    setLoading(true);
    const response = await client.get(`/users?page=${page}`, {
      headers: { Authorization: "Bearer " + session?.access_token },
    });
    setData(response.data.data);
    setTotalRows(response.data.totalCount);
    setLoading(false);
  };

  const columns = useMemo(
    () => [
      {
        name: "Id",
        sortable: true,
        maxWidth: "100px",
        center: true,
        selector: (row: any) => row.id,
      },
      {
        name: "",
        button: true,
        width: "100px",
        // eslint-disable-next-line react/display-name
        cell: (row: any) => (
          <div className="flex-shrink-0">
            {row.picture ? (
              <Image
                loader={imageLoader}
                width={40}
                height={40}
                src={row.picture.path}
                quality={100}
                alt="Picture of the author"
              />
            ) : (
              <Image
                width={40}
                height={40}
                src="/images/user-avatar.png"
                quality={100}
                alt={`profile picture of user #${row.id}`}
              />
            )}
          </div>
        ),
      },
      {
        name: "Name",
        sortable: true,
        // eslint-disable-next-line react/display-name
        cell: (row: any) => (
          <div className="">
            <Link href={`/users/edit/${row.id}`} passHref>
              <a href="#" className="hover:text-gray-800">
                {row.nameEn}
              </a>
            </Link>
          </div>
        ),
      },
      {
        name: "Email",
        sortable: true,
        selector: (row: any) => row.email,
      },

      {
        name: "Roles",
        // eslint-disable-next-line react/display-name
        cell: (row: any) => (
          <div className="">
            <ul className="flex flex-wrap">
              {row.roles.map((role: any) => (
                <li
                  className="bg-red-next mb-2 text-white px-2 py-1 mr-2 rounded-md shadow-sm font-semibold"
                  key={row.id + role.name}
                >
                  {role.name}
                </li>
              ))}
            </ul>
          </div>
        ),
      },
      {
        name: "Status",
        maxWidth: "100px",
        // eslint-disable-next-line react/display-name
        cell: (row: any) => (
          <div className="">
            {row.isActive ? (
              <p className="mt-2 flex items-center text-sm text-gray-500">
                <CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" />
                Active
              </p>
            ) : (
              <p className="mt-2 flex items-center text-sm text-gray-500">
                <XCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-red-400" />
                Disabled
              </p>
            )}
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
        name: "",
        button: true,
        width: "180px",
        // eslint-disable-next-line react/display-name
        cell: (row: any) => (
          <div className="">
            <Link href={`/users/edit/${row.id}`} passHref>
              <button
                type="button"
                className="mr-3 inline-flex items-center px-3 py-2  border-gray-300 rounded-md hover:shadow-sm text-xs font-medium text-gray-700  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
              >
                <PencilAltIcon className="h-5 w-5 text-gray-400 hover:text-indigo-600" />
              </button>
            </Link>
            <button
              disabled
              type="button"
              className="disabled:opacity-50 inline-flex items-center px-3 py-2  border-gray-300 rounded-md hover:shadow-sm text-xs font-medium text-gray-700  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-red-next"
            >
              <TrashIcon className="h-5 w-5 text-gray-400 hover:text-red-next" />
            </button>
          </div>
        ),
      },
    ],
    []
  );
  const page = router.query?.page || 1;

  useEffect(() => {
    fetchUsers(Number(page));
  }, []);

  return (
    <MainLayout>
      <div className="space-y-6 mt-4 px-10">
        <main className="pt-8 bg-white shadow py-5 sm:rounded-lg">
          <div className="px-6">
            <h1 className="text-lg leading-6 font-medium text-gray-900">User Manager</h1>
          </div>

          {/* tabs */}
          <div className="border-b border-gray-200 px-6">
            <nav className="-mb-px flex justify-between">
              <div className="-mb-px flex space-x-8 " aria-label="Tabs">
                <Link href="/users" passHref>
                  <a
                    className={`border-transparent  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-purple-500 text-purple-600`}
                    href="#"
                  >
                    Users
                  </a>
                </Link>
                <Link href="/users/roles" passHref>
                  <a
                    href="#"
                    className={`border-transparent  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-200`}
                  >
                    Roles
                  </a>
                </Link>
              </div>
              <div className="flex just-center items-center pb-4">
                <Link href="/users/create" passHref>
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
          {/* eof tabs */}

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
                paginationPerPage={10}
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
UsersIndex.auth = true;
export default UsersIndex;
