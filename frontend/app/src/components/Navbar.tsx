import { useAuth0 } from "@auth0/auth0-react";

import { LoginButton, LogoutButton, Title } from "./";

export const Navbar = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <nav className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-5">
      <Title />
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </nav>
  );
};
