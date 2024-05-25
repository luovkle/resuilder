import type { ProfileUpdate } from "../../services/api";
import { ProfilesApi } from "../../services/api";
import useApi from "../useApi";

const useProfileApi = () => {
  const profileApi = useApi(ProfilesApi);

  const readProfile = async () => {
    if (!profileApi) {
      return Promise.reject("profileApi is undefined");
    }
    const response = await profileApi.readProfileCurrentUserProfilesMeGet();
    return response.data;
  };

  const updateProfile = async (data: ProfileUpdate) => {
    if (!profileApi) {
      return Promise.reject("profileApi is undefined");
    }
    const response =
      await profileApi.updateProfileCurrentUserProfilesMePatch(data);
    return response.data;
  };

  return {
    readProfile,
    updateProfile,
  };
};

export default useProfileApi;
