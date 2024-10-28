"use client";

import { FC, ReactNode, useRef } from "react";
import { AppStore, makeStore } from "@/libs/store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate persistor={storeRef.current.__persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider;
