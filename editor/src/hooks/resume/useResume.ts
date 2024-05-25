import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ResumeUpdate } from "../../services/api";
import useResumeApi from "./useResumeApi";

const useResume = () => {
  const queryClient = useQueryClient();
  const { createResume, readResume, updateResume, deleteResume } =
    useResumeApi();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["resume"],
    queryFn: readResume,
  });

  const createResumeMutation = useMutation({
    mutationFn: createResume,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["resume"] }),
  });

  const updateResumeMutation = useMutation({
    mutationFn: updateResume,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["resume"] }),
  });

  const deleteResumeMutation = useMutation({
    mutationFn: deleteResume,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["resume"] }),
  });

  return {
    resume: data,
    isLoading,
    isError,
    error,
    createResume: () => createResumeMutation.mutate(),
    updateResume: (data: ResumeUpdate) => {
      updateResumeMutation.mutate(data);
    },
    deleteResume: () => {
      deleteResumeMutation.mutate();
    },
  };
};

export default useResume;
