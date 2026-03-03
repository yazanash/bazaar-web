import { getAdmins } from "@/lib/actions/admin";
import React from "react";
import AdminsManagement from "./adminsList";

const page = async () => {
  const response = await getAdmins();

  return <AdminsManagement initialAdmins={response.data ?? []} />;
};

export default page;
