import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { AppPage } from "./pages";
import { Spinner, Navbar } from "./components";

export const App = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    loginWithRedirect();
  }

  return (
    isAuthenticated && (
      <>
        <Navbar />
        <Routes>
          <Route index element={<AppPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </>
    )
  );
};
