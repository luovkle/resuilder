import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { AppPage } from "./pages";
import { LoginButton, LogoutButton, Spinner } from "./components";

export const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      <Routes>
        <Route index element={<AppPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
