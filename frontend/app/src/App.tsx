import { Navigate, Route, Routes } from "react-router-dom";

import { HomePage, LoginPage } from "./pages";

export const App = () => {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
