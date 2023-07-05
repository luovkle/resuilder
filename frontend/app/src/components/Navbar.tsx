import { useAuth0 } from "@auth0/auth0-react";

import { LoginButton, LogoutButton, Title } from "./";
import DownloadButton from "./DownloadButton";

export const Navbar = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <nav className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-5">
      <Title />
      {isAuthenticated ? (
        <div className="space-x-2.5">
          <DownloadButton />
          <LogoutButton />
        </div>
      ) : (
        <LoginButton />
      )}
    </nav>
  );
};
