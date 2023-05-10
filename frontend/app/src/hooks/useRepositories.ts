import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import {
  OpenAPI,
  RepositoriesService,
  RepositoryRead,
  RepositoryUpdate,
} from "../client";

export const useRepositories = () => {
  const [repositories, setRepositories] = useState<RepositoryRead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { getAccessTokenSilently } = useAuth0();

  const readRepositories = async () => {
    setIsLoading(true);
    OpenAPI.TOKEN = await getAccessTokenSilently();
    RepositoriesService.readCurrentRepositoriesProfilesMeRepositoriesGet()
      .then(setRepositories)
      .catch(console.error);
    setIsLoading(false);
  };

  const updateRepository = (id: string, repository: RepositoryUpdate) => {
    setIsLoading(true);
    RepositoriesService.updateCurrentRepositoryProfilesMeRepositoriesIdPut(
      id,
      repository
    )
      .then((newRepository) =>
        setRepositories((currentRepositories) =>
          currentRepositories.map((currentRepository) =>
            currentRepository._id === id ? newRepository : currentRepository
          )
        )
      )
      .catch(console.error);
    setIsLoading(false);
  };

  useEffect(() => {
    readRepositories();
  }, []);

  return {
    repositories,
    updateRepository,
    isLoading,
  };
};
