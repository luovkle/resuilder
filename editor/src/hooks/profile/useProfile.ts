import type { ProfileUpdate } from "../../services/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useProfileApi from "./useProfileApi";

const useProfile = () => {
  const queryClient = useQueryClient();
  const { readProfile, updateProfile } = useProfileApi();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["profile"],
    queryFn: readProfile,
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
  });

  return {
    profile: data,
    isLoading,
    isError,
    error,
    updateProfile: (data: ProfileUpdate) => {
      updateProfileMutation.mutate(data);
    },
  };
};

export default useProfile;
