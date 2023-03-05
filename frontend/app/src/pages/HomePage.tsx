import {
  Summary,
  Contact,
  About,
  Skills,
  Positions,
  Repositories,
} from "../components";

export const HomePage = () => {
  return (
    <>
      <div className="bg-gray-900 text-gray-200">
        <div className="container mx-auto divide-gray-700 max-w-3xl">
          <Summary />
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
      </div>
    </>
  );
};
