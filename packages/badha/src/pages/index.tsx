import { useSession, signIn, signOut } from "next-auth/client";

import MainLayout from "../components/layouts/MainLayout";
const Index = () => {
  const [session, loading] = useSession();
  if (session) {
    return (
      <>
        <MainLayout>HelloWorld</MainLayout>;
        {/* Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button> */}
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};
export default Index;
