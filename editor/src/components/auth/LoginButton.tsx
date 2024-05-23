import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() => loginWithRedirect()}
      className="text-lg bg-blue-600 hover:bg-blue-500 py-2 px-4 rounded-lg"
    >
      Log In Now
    </button>
  );
};

export default LoginButton;
