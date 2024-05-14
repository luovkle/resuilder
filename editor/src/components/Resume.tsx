import { Contact, Experience, Profile, Projects } from "./";

const Resume = () => {
  return (
    <main className="container mx-auto divide-gray-700 max-w-3xl">
      <Profile />
      <hr />
      <Contact />
      <hr />
      <Experience />
      <hr />
      <Projects />
    </main>
  );
};

export default Resume;
