import type { ProjectUpdate } from "../../services/api";
import { ProjectsApi } from "../../services/api";
import useApi from "../useApi";

const useProjectApi = () => {
  const projectApi = useApi(ProjectsApi);

  const readProjects = async () => {
    if (!projectApi) {
      return Promise.reject("projectApi is undefined");
    }
    const response = await projectApi.readProjectsCurrentUserProjectsMeGet();
    return response.data;
  };

  const updateProject = async (id: string, data: ProjectUpdate) => {
    if (!projectApi) {
      return Promise.reject("projectApi is undefined");
    }
    const response = await projectApi.updateProjectCurrentUserProjectsMeIdPatch(
      id,
      data,
    );
    return response.data;
  };

  const refreshProjects = async () => {
    if (!projectApi) {
      return Promise.reject("projectApi is undefined");
    }
    const response =
      await projectApi.updateProjectRefreshCurrentUserProjectsMeRefreshPut();
    return response.data;
  };

  return {
    readProjects,
    updateProject,
    refreshProjects,
  };
};

export default useProjectApi;
