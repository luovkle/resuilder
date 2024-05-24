import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

const useAuth = () => {
  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect } =
    useAuth0();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        if (isAuthenticated) {
          const token = await getAccessTokenSilently();
          setAccessToken(token);
        }
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchAccessToken();
  }, [getAccessTokenSilently, isAuthenticated, loginWithRedirect]);

  return { accessToken, error };
};

export default useAuth;
