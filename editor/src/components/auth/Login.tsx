import LoginButton from "./LoginButton";

const Login = () => {
  return (
    <div className="h-screen w-screen relative h-5/6 flex justify-center items-center px-28">
      <div className="flex-row space-y-8">
        <h1 className="font-extrabold text-8xl">Welcome to the Fun Zone!</h1>
        <h2 className="text-2xl">
          To join the party, you need to log in first. It's quick and easy, we
          promise! 🚀
        </h2>
        <LoginButton />
      </div>
    </div>
  );
};

export default Login;
