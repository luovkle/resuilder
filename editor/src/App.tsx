import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton, Navbar, Resume } from "./components";

const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated) {
    return <LoginButton />;
  }

  return (
    <>
      <Navbar />
      <Resume />
    </>
  );
};

export default App;
