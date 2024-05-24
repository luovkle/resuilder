import { useMemo } from "react";
import { Configuration } from "../services/api";
import settings from "../config";
import useAuth from "./useAuth";

const useApi = <T>(ApiClass: new (config: Configuration) => T): T | null => {
  const { accessToken } = useAuth();

  const apiClient = useMemo(() => {
    if (!accessToken) return null;

    const config = new Configuration({
      basePath: settings.VITE_EDITOR_API_HTTP_URL,
      accessToken,
    });

    return new ApiClass(config);
  }, [accessToken, ApiClass]);

  return apiClient;
};

export default useApi;
