import { useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    about: "...",
  });

  return (
    <div className="py-5 space-y-5">
      <div>
        <h5 className="text-sm font-medium text-gray-400 select-none">
          Profile
        </h5>
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{profile.name}</h2>
        <p className="text-gray-300">{profile.about}</p>
      </div>
    </div>
  );
};

export default Profile;
