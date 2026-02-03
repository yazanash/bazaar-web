import ProfileForm from "./components/ProfileForm";

const page = () => {
  const dummyProfile = {
    name: "محمد الأحمد",
    phone: "0933445566",
    gender: "male",
    birthDate: "1995-05-20",
  };
  return <ProfileForm initialData={dummyProfile} />;
};

export default page;
