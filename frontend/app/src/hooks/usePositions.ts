import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import {
  OpenAPI,
  PositionCreate,
  PositionRead,
  PositionsService,
  PositionUpdate,
} from "../client";

export const usePositions = () => {
  const [positions, setPositions] = useState<PositionRead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { getAccessTokenSilently } = useAuth0();

  const createPosition = (position: PositionCreate) => {
    setIsLoading(true);
    PositionsService.createPositionProfilesMePositionsPost(position)
      .then((newPosition) =>
        setPositions((currentPositions) => [...currentPositions, newPosition])
      )
      .catch(console.error);
    setIsLoading(false);
  };

  const readPositions = async () => {
    setIsLoading(true);
    OpenAPI.TOKEN = await getAccessTokenSilently();
    PositionsService.readCurrentPositionsProfilesMePositionsGet()
      .then(setPositions)
      .catch(console.error);
    setIsLoading(false);
  };

  const updatePosition = (id: string, position: PositionUpdate) => {
    setIsLoading(true);
    PositionsService.updateCurrentPositionProfilesMePositionsIdPut(id, position)
      .then((newPosition) =>
        setPositions((currentPositions) =>
          currentPositions.map((currentPosition) =>
            currentPosition._id === id ? newPosition : currentPosition
          )
        )
      )
      .catch(console.error);
    setIsLoading(false);
  };

  useEffect(() => {
    readPositions();
  }, []);

  return {
    positions,
    createPosition,
    updatePosition,
    isLoading,
  };
};
