import PackagesPage from "@/components/PackagesPage";
import { getPackages } from "@/lib/actions/packages";
import { getTranslations } from "next-intl/server";
import React from "react";

const GetPackges = async () => {
  const response = await getPackages();
  const t = await getTranslations("common");
  if (!response.data) {
    return <h1>{t("noData")}</h1>;
  }
  return <PackagesPage packages={response.data} />;
};

export default GetPackges;
