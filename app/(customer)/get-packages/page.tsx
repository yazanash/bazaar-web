import PackagesPage from "@/components/PackagesPage";
import { getPackages } from "@/lib/actions/packages";
import React from "react";

const GetPackges = async () => {
  const response = await getPackages();
  if (!response.data) {
    return <h1>Not found</h1>;
  }
  return <PackagesPage packages={response.data} />;
};

export default GetPackges;
