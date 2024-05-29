import { useMemo } from "react";
import { Configuration } from "../services/api";
import settings from "../config";
import useAuth from "./useAuth";

const useGeneratorApi = <T>(
  GeneratorApiClass: new (config: Configuration) => T,
): T | null => {
  const { accessToken } = useAuth();

  const generatorApiClient = useMemo(() => {
    if (!accessToken) return null;

    const config = new Configuration({
      basePath: settings.VITE_GENERATOR_HTTP_URL,
      accessToken,
    });

    return new GeneratorApiClass(config);
  }, [accessToken, GeneratorApiClass]);

  return generatorApiClient;
};

export default useGeneratorApi;
