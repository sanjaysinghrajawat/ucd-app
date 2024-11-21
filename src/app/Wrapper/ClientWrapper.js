"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { AppContext } from "./Context";

const ClientWrapper = ({ children }) => {
  const { setSelectedModel, auth } = useContext(AppContext);
  const router = useRouter();

  return (
    <>
      {auth ? (
        <>
          <Navbar setSelectedModel={setSelectedModel} />
          {children}
        </>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
};

export default ClientWrapper;
