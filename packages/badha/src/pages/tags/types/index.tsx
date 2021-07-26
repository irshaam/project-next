import { GetStaticProps } from "next";

import MainLayout from "../../../components/layouts/MainLayout";

export async function getStaticProps(context: any) {
  //  get tag types
  const tagTypes = await fetch("http://localhost:5000/tags/types");
  const types = await tagTypes.json();

  //  get tag types
  const tagsReponse = await fetch("http://localhost:5000/tags");
  const tags = await tagsReponse.json();

  return {
    props: {
      types,
      tags,
    }, // will be passed to the page component as props
  };
}
const TagTypes = ({ types, tags }) => {
  return (
    <MainLayout>
      {/* !-- Page heading --> */}
      <header className="py-8">
        <div className="max-w-full flex mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Tag Types</h1>
          </div>
        </div>
      </header>

      {/* TABLE GOES HERE */}
      <div className="flex flex-col px-4 sm:px-6 lg:px-8">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Meta
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Layout
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {types.map((type: any, idx: any) => (
                    <tr className={idx % 2 == 0 ? "bg-white" : "bg-gray-50"} key={`taga_type_${type.id}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{type.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {type.meta ? type.meta : "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{type.layout}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TagTypes;
