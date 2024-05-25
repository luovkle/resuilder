import { Contact, Experience, Profile, Projects } from "./";
import { useResume } from "../hooks";

const Resume = () => {
  const { resume, createResume, isLoading } = useResume();

  return (
    <main className="container mx-auto divide-gray-700 max-w-3xl">
      {resume && (
        <>
          <Profile />
          <hr />
          <Contact />
          <hr />
          <Experience />
          <hr />
          <Projects />
        </>
      )}

      {!resume && !isLoading && (
        <div className="absolute h-5/6 flex justify-center items-center px-28">
          <div className="h-max flex-row space-y-8">
            <h1 className="font-extrabold text-6xl">
              Oops! It looks like your resume went on vacation 🌴
            </h1>
            <button
              onClick={() => createResume()}
              className="text-lg bg-blue-600 hover:bg-blue-500 py-2 px-4 rounded-lg"
            >
              Let's create it together! 🚀
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Resume;
