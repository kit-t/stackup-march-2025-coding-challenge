import { authProviderServer } from "@providers/auth-provider/auth-provider.server";
import { ThemedLayoutV2 } from "@components/layouts";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({ children }: React.PropsWithChildren) {
  const { authenticated, redirectTo } = await authProviderServer.check();

  if (!authenticated) {
    return redirect(redirectTo || "/login");
  }

  return <ThemedLayoutV2>{children}</ThemedLayoutV2>;
}
