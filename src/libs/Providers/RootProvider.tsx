"use client";

import React, { FC, ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";
import StoreProvider from "@/libs/Providers/StoreProvider";

interface RootProviderProps {
  children: ReactNode;
}

const RootProvider: FC<RootProviderProps> = ({ children }) => {
  return (
    <NextUIProvider>
      <StoreProvider>{children}</StoreProvider>
    </NextUIProvider>
  );
};

export default RootProvider;
