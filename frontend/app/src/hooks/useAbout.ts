import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { AboutRead, AboutsService, OpenAPI } from "../client";

export const useAbout = (initialData: AboutRead) => {
  const [about, setAbout] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);

  const { getAccessTokenSilently } = useAuth0();

  const getData = async () => {
    setIsLoading(true);
    const token = await getAccessTokenSilently();
    OpenAPI.TOKEN = token;
    AboutsService.readCurrentAboutProfilesMeAboutsGet()
      .then((res) => setAbout(res))
      .catch(console.error);
    setIsLoading(false);
  };

  const updateAbout = async (newAbout: string) => {
    setIsLoading(true);
    AboutsService.updateCurrentAboutProfilesMeAboutsPut({
      about: newAbout,
    })
      .then((res) => setAbout(res))
      .catch(console.error);
    setIsLoading(false);
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
