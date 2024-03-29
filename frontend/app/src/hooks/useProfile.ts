import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { OpenAPI, ProfileRead, ProfilesService } from "../client";

export const useProfile = (initialState: ProfileRead) => {
  const [profile, setProfile] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);

  const { getAccessTokenSilently } = useAuth0();

  const getData = async () => {
    setIsLoading(true);
    const token = await getAccessTokenSilently();
    OpenAPI.TOKEN = token;
    ProfilesService.readCurrentProfileProfilesMeGet()
      .then((res) => setProfile(res))
      .catch(console.error);
    setIsLoading(false);
  };

  const newName = (arg: string) => {
    setIsLoading(true);
    ProfilesService.updateCurrentProfileProfilesMePut({ name: arg })
      .then((res) => setProfile(res))
      .catch(console.error);
    setIsLoading(false);
  };

  const newContent = (arg: string) => {
    setIsLoading(true);
    ProfilesService.updateCurrentProfileProfilesMePut({ content: arg })
      .then((res) => setProfile(res))
      .catch(console.error);
    setIsLoading(false);
  };

  const newPicture = (picture: File) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("picture", picture, picture.name);
    ProfilesService.updateCurrentPictureProfilesMePicturePut({
      picture,
    })
      .then((res) => setProfile(res))
      .catch(console.error);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    profile,
    newName,
    newContent,
    newPicture,
    isLoading,
  };
};
