import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { OpenAPI, SkillRead, SkillsService } from "../client";

export const useSkills = () => {
  const [skills, setSkills] = useState<SkillRead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { getAccessTokenSilently } = useAuth0();

  const createSkill = (name: string) => {
    setIsLoading(true);
    SkillsService.createSkillProfilesMeSkillsPost({ name })
      .then((newSkill) =>
        setSkills(
          (currentSkills) => [...currentSkills, newSkill],
        )
      )
      .catch(console.error);
    setIsLoading(false);
  };

  const readSkills = async () => {
    setIsLoading(true);
    OpenAPI.TOKEN = await getAccessTokenSilently();
    SkillsService.readCurrentSkillsProfilesMeSkillsGet()
      .then(setSkills)
      .catch(console.error);
    setIsLoading(false);
  };

  const updateSkill = (id: string, newName: string) => {
    setIsLoading(true);
    SkillsService.updateCurrentSkillsProfilesMeSkillsIdPut(id, {
      name: newName,
    })
      .then((newSkill) =>
        setSkills((currentSkills) =>
          currentSkills.map((currentSkill) =>
            currentSkill._id === id ? newSkill : currentSkill
          )
        )
      )
      .catch(console.error);
    setIsLoading(false);
  };

  const deleteSkill = (id: string) => {
    setIsLoading(true);
    SkillsService.deleteCurrentSkillProfilesMeSkillsIdDelete(id)
      .then(() =>
        setSkills((currentSkills) =>
          currentSkills.filter((currentSkill) => currentSkill._id !== id)
        )
      )
      .catch(console.error);
    setIsLoading(false);
  };

  useEffect(() => {
    readSkills();
  }, [skills]);

  return {
    skills,
    createSkill,
    updateSkill,
    deleteSkill,
    isLoading,
  };
};
