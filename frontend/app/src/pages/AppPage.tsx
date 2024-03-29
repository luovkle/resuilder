import {
  About,
  Contact,
  Positions,
  Profile,
  Repositories,
  Skills,
} from "../components";

export const AppPage = () => {
  return (
    <div className="container mx-auto divide-gray-700 max-w-3xl">
      <Profile />
      <hr />
      <Contact />
      <hr />
      <About />
      <hr />
      <Skills />
      <hr />
      <Positions />
      <hr />
      <Repositories />
    </div>
  );
};
