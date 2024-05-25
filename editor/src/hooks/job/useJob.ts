import type { JobCreate, JobUpdate } from "../../services/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useJobApi from "./useJobApi";

const useJob = () => {
  const queryClient = useQueryClient();
  const { createJob, readJobs, updateJob, deleteJob } = useJobApi();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["job"],
    queryFn: readJobs,
  });

  const createJobMutation = useMutation({
    mutationFn: createJob,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["job"] }),
  });

  const updateJobMutation = useMutation({
    mutationFn: updateJob,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["job"] }),
  });

  const deleteJobMutation = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["job"] }),
  });

  return {
    jobs: data,
    isLoading,
    isError,
    error,
    createJob: (data: JobCreate) => createJobMutation.mutate(data),
    updateJob: (data: { id: string; data: JobUpdate }) => {
      updateJobMutation.mutate(data);
    },
    deleteJob: (id: string) => {
      deleteJobMutation.mutate(id);
    },
  };
};

export default useJob;
