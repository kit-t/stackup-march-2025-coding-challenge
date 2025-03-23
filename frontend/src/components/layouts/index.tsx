"use client";

import React from "react";
import { ThemedLayoutV2 as ThemedLayoutV2Base, ThemedTitleV2 } from "@refinedev/mui";
import { Header } from "../header";

export const ThemedLayoutV2 = ({ children, ...props }: React.PropsWithChildren) => {
  return (
    <ThemedLayoutV2Base
      Header={Header}
      Title={({ collapsed }) => (
        <ThemedTitleV2
          // collapsed is a boolean value that indicates whether the <Sidebar> is collapsed or not
          collapsed={collapsed}
          icon={collapsed ? "💊" : "💊"}
          text="The 💊 Inventory App"
        />
      )}
      {...props}
    >
      {children}
    </ThemedLayoutV2Base>
  );
};
