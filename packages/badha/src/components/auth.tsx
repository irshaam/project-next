import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { AbilityContext, AppAbility } from "@/components/auth/can";

const Auth = ({ children }: { children: any }) => {
  const router = useRouter();

  const [session, loading] = useSession();
  const isUser = !!session?.user;
  useEffect(() => {
    if (loading) return; // Do nothing while loading
    if (!isUser) router.push("/auth/login");
  }, [isUser, loading, router]);

  if (isUser) {
    const ability = AppAbility(session?.rules);
    // console.log(ability);
    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>;
};

export default Auth;
