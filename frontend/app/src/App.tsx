import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { AppPage, HomePage } from "./pages";
import { Spinner, Navbar } from "./components";

export const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={isAuthenticated ? <AppPage /> : <HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
