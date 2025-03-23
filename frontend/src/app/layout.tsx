import { DevtoolsProvider } from "@providers/devtools";
import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  RefineSnackbarProvider,
  useNotificationProvider,
} from "@refinedev/mui";
import routerProvider from "@refinedev/nextjs-router";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React, { Suspense } from "react";

import { ColorModeContextProvider } from "@contexts/color-mode";
import { authProviderClient } from "@providers/auth-provider/auth-provider.client";
import { dataProvider } from "@providers/data-provider";

export const metadata: Metadata = {
  title: "The 💊 Inventory App",
  description: "A pharmaceutical inventory system as submission for StackUp March 2025 Coding Challenge",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");
  const defaultMode = theme?.value === "dark" ? "dark" : "light";

  return (
    <html lang="en">
      <body>
        <Suspense>
          <RefineKbarProvider>
            <ColorModeContextProvider defaultMode={defaultMode}>
              <RefineSnackbarProvider>
                <DevtoolsProvider>
                  <Refine
                    routerProvider={routerProvider}
                    authProvider={authProviderClient}
                    dataProvider={dataProvider}
                    notificationProvider={useNotificationProvider}
                    resources={[{
                      name: "products",
                      list: "/products",
                      create: "/products/create",
                      edit: "/products/edit/:id",
                      show: "/products/show/:id",
                      meta: {
                        canDelete: true,
                      },
                    }, {
                      name: "suppliers",
                      list: "/suppliers",
                      create: "/suppliers/create",
                      edit: "/suppliers/edit/:id",
                      show: "/suppliers/show/:id",
                      meta: {
                        canDelete: true,
                      },
                    }, {
                      name: "purchase_orders",
                      list: "/purchase-orders",
                      create: "/purchase-orders/create",
                      edit: "/purchase-orders/edit/:id",
                      show: "/purchase-orders/show/:id",
                      meta: {
                        canDelete: true,
                      },
                    }, {
                      name: "batches",
                      list: "/batches",
                      create: "/batches/create",
                      edit: "/batches/edit/:id",
                      show: "/batches/show/:id",
                      meta: {
                        canDelete: true,
                      },
                    }, {
                      name: "patients",
                      list: "/patients",
                      create: "/patients/create",
                      edit: "/patients/edit/:id",
                      show: "/patients/show/:id",
                      meta: {
                        canDelete: true,
                      },
                    }, {
                      name: "prescriptions",
                      list: "/prescriptions",
                      create: "/prescriptions/create",
                      edit: "/prescriptions/edit/:id",
                      show: "/prescriptions/show/:id",
                      meta: {
                        canDelete: true,
                      },
                    }]}
                    options={{
                      syncWithLocation: true,
                      warnWhenUnsavedChanges: true,
                      useNewQueryKeys: true,
                      projectId: "mGdlTn-sn1R18-jaH04T",
                    }}
                  >
                    {children}
                    <RefineKbar />
                  </Refine>
                </DevtoolsProvider>
              </RefineSnackbarProvider>
            </ColorModeContextProvider>
          </RefineKbarProvider>
        </Suspense>
      </body>
    </html>
  );
}
