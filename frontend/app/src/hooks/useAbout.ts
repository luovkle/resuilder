import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { OpenAPI, AboutService } from "../client";

export const useAbout = (initialData: string) => {
  const [about, setAbout] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);

  const { getAccessTokenSilently } = useAuth0();

  const getData = async () => {
    setIsLoading(true);
    const token = await getAccessTokenSilently();
    OpenAPI.TOKEN = token;
    const { about: data } =
      await AboutService.readCurrentAboutProfilesMeAboutGet();
    if (data !== "") setAbout(data);
    setIsLoading(false);
  };

  const updateAbout = async (data: string) => {
    const { about } = await AboutService.updateCurrentAboutProfilesMeAboutPut({
      about: data,
    });
    setAbout(about);
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    about,
    updateAbout,
    isLoading,
  };
};
