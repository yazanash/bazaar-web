import ProfileForm from "../../../components/forms/ProfileForms/ProfileForm";
import { UnauthorizedBlock } from "@/components/UnauthorizedBlock";
import { getProfileAction } from "@/lib/actions/profile";
const page = async () => {
  const result = await getProfileAction();
  if (result.status == 401) {
    return <UnauthorizedBlock />;
  }
  if (result.success && result.data) {
    return <ProfileForm initialData={result.data} />;
  }
  return <ProfileForm />;
};

export default page;
