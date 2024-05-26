import { useProfile } from "../../hooks";
import Name from "./Name";
import About from "./About";
import Skeleton from "./Skeleton";

const Profile = () => {
  const { profile, updateProfile, isLoading } = useProfile();

  const updateName = (name: string) => {
    updateProfile({ name });
  };

  const updateAbout = (about: string) => {
    updateProfile({ about });
  };

  return (
    <div className="py-5 space-y-5">
      <div>
        <h5 className="text-sm font-medium text-gray-400 select-none">
          Profile
        </h5>
      </div>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="space-y-2">
          <Name name={profile?.name || "🤡"} updateName={updateName} />
          <About about={profile?.about || "🙈"} updateAbout={updateAbout} />
        </div>
      )}
    </div>
  );
};

export default Profile;
