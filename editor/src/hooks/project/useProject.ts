import type { ProjectUpdate } from "../../services/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useProjectApi from "./useProjectApi";

const useProject = () => {
  const queryClient = useQueryClient();
  const { readProjects, updateProject, refreshProjects } = useProjectApi();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["project"],
    queryFn: readProjects,
  });

  const updateProjectMutation = useMutation({
    mutationFn: updateProject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["project"] }),
  });

  const refreshProjectsMutation = useMutation({
    mutationFn: refreshProjects,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["project"] }),
  });

  return {
    projects: data,
    isLoading,
    isError,
    error,
    updateProject: (data: { id: string; data: ProjectUpdate }) => {
      updateProjectMutation.mutate(data);
    },
    refreshProjects: () => {
      refreshProjectsMutation.mutate();
    },
  };
};

export default useProject;
