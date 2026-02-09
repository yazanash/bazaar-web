import ProfileForm from "./components/ProfileForm";
import { UnauthorizedBlock } from "@/components/UnauthorizedBlock";
import { getProfileAction } from "@/lib/actions/profile";
const page = async () => {
  try {
    const result = await getProfileAction();

    if (result.success && result.data) {
      return <ProfileForm initialData={result.data} />;
    }

    return <ProfileForm />;
  } catch (error: any) {
    if (error.message.includes("401")) {
      return <UnauthorizedBlock />;
    }
  }
};

export default page;
