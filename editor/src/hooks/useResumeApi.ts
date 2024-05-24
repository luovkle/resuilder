import type { ResumeUpdate } from "../services/api";
import { ResumesApi } from "../services/api";
import useApi from "./useApi";

const useResumeApi = () => {
  const resumeApi = useApi(ResumesApi);

  const createResume = async () => {
    if (!resumeApi) {
      return Promise.reject("resumeApi is undefined");
    }
    const response = await resumeApi.createResumeCurrentUserResumesMePost();
    return response.data;
  };

  const readResume = async () => {
    if (!resumeApi) {
      return Promise.reject("resumeApi is undefined");
    }
    const response = await resumeApi.readResumeCurrentUserResumesMeGet();
    return response.data;
  };

  const updateResume = async (data: ResumeUpdate) => {
    if (!resumeApi) {
      return Promise.reject("resumeApi is undefined");
    }
    const response =
      await resumeApi.updateResumeCurrentUserResumesMePatch(data);
    return response.data;
  };

  const deleteResume = async () => {
    if (!resumeApi) {
      return Promise.reject("resumeApi is undefined");
    }
    const response = await resumeApi.deleteResumeCurrentUserResumesMeDelete();
    return response.data;
  };

  return {
    createResume,
    readResume,
    updateResume,
    deleteResume,
  };
};

export default useResumeApi;
