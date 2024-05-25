import type { JobCreate, JobUpdate } from "../../services/api";
import { JobsApi } from "../../services/api";
import useApi from "../useApi";

const useJobApi = () => {
  const jobApi = useApi(JobsApi);

  const createJob = async (data: JobCreate) => {
    if (!jobApi) {
      return Promise.reject("jobApi is undefined");
    }
    const response = await jobApi.createJobCurrentUserJobsMePost(data);
    return response.data;
  };

  const readJobs = async () => {
    if (!jobApi) {
      return Promise.reject("jobApi is undefined");
    }
    const response = await jobApi.readJobsCurrentUserJobsMeGet();
    return response.data;
  };

  const updateJob = async (id: string, data: JobUpdate) => {
    if (!jobApi) {
      return Promise.reject("jobApi is undefined");
    }
    const response = await jobApi.updateJobCurrentUserJobsMeIdPatch(id, data);
    return response.data;
  };

  const deleteJob = async (id: string) => {
    if (!jobApi) {
      return Promise.reject("jobApi is undefined");
    }
    const response = await jobApi.deleteJobCurrentUserJobsMeIdDelete(id);
    return response.data;
  };

  return {
    createJob,
    readJobs,
    updateJob,
    deleteJob,
  };
};

export default useJobApi;
