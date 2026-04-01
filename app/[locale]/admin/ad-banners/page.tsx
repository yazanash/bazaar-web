import { GetAdminAdBanners } from "@/lib/actions/admin";
import React from "react";
import AdBannersList from "./AdBannersList";

const AdBannersPage = async () => {
  const response = await GetAdminAdBanners();

  return <AdBannersList banners={response.data ?? []} />;
};

export default AdBannersPage;
