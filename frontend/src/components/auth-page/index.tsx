"use client";
import type { AuthPageProps } from "@refinedev/core";
import { AuthPage as AuthPageBase } from "@refinedev/mui";

export const AuthPage = (props: AuthPageProps) => {
  return (
    <AuthPageBase
      title="The 💊 Inventory App"
      formProps={{
        defaultValues: {
          email: "info@refine.dev",
          password: "refine-supabase",
        },
      }}
      {...props}
    />
  );
};
