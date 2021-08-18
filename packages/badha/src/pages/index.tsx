import { useSession, signIn, signOut } from "next-auth/client";

import { MainLayout } from "@/components/layouts";
const stats = [
  { name: "Total Subscribers", stat: "71,897" },
  { name: "Avg. Open Rate", stat: "58.16%" },
  { name: "Avg. Click Rate", stat: "24.57%" },
];
const IndexPage = () => {
  const [session, loading] = useSession();

  return (
    <MainLayout>
      <div className="space-y-6 mt-4 px-10">
        <div>
          {/* <span>My name is {session && session.user?.name}</span>
          {JSON.stringify(session)} */}
          <h3 className="text-lg leading-6 font-medium text-gray-900">Last 30 days</h3>
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {stats.map((item) => (
              <div key={item.name} className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.stat}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </MainLayout>
  );
};

IndexPage.auth = true;
export default IndexPage;
