import { useState } from "react";

const Resume = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    about: "...",
  });
  const [contactMethods, setContactMethods] = useState([
    {
      title: "localhost",
      url: "http://localhost",
    },
  ]);
  const [jobs, setJobs] = useState([
    {
      title: "test",
      picture_url: "https://localhost/picture.png",
      start_date: "",
      end_date: "",
      details: "",
      responsibilities: ["test"],
      techStack: ["test"],
      tools: ["test"],
    },
  ]);
  const [projects, setProjects] = useState([
    {
      name: "test",
      url: "https://localhost",
      description: "test",
      langs: [
        {
          name: "test",
          percen: "test",
        },
      ],
    },
  ]);

  return (
    <main className="container mx-auto divide-gray-700 max-w-3xl">
      {/* Profile */}
      <div className="py-5 space-y-5">
        <div>
          <h5 className="text-sm font-medium text-gray-400 select-none">
            Profile
          </h5>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="text-gray-300">{profile.about}</p>
        </div>
      </div>
      {/* End Profile */}

      {/* Contact */}
      <hr />
      <div className="py-5 space-y-5">
        <div>
          <h5 className="text-sm font-medium text-gray-400 select-none">
            Contact
          </h5>
        </div>
        <div className="flex flex-wrap gap-2">
          {contactMethods.map((contactMethod) => (
            <a
              href={contactMethod.url}
              target="”_blank”"
              className="bg-gray-700 px-4 py-1"
            >
              {contactMethod.title}
            </a>
          ))}
        </div>
      </div>
      {/* End Contact */}

      {/* Experience */}
      <hr />
      <div className="py-5 space-y-5">
        <div>
          <h5 className="text-sm font-medium text-gray-400 select-none">
            Experience
          </h5>
        </div>
        <div className="space-y-5">
          {jobs.map((job) => (
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-1">
                <img
                  src={job.picture_url}
                  alt={job.title}
                  className="rounded-full"
                />
              </div>
              <div className="col-span-11">
                <div className="space-y-2.5">
                  <div>
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="text-gray-400 text-sm">
                      <span>
                        {job.start_date} - {job.end_date}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">{job.details}</p>
                  </div>
                </div>

                {/* Responsibilities */}
                <div className="py-2.5 space-y-2.5">
                  <div>
                    <h5 className="text-sm font-medium text-gray-400 select-none">
                      Responsibilities
                    </h5>
                  </div>
                  <ul className="pl-10 list-disc">
                    {job.responsibilities.map((responsibility) => (
                      <li>{responsibility}</li>
                    ))}
                  </ul>
                </div>
                {/* End Responsibilities */}

                {/* Tech Stack */}
                <div className="py-2.5 space-y-2.5">
                  <div>
                    <h5 className="text-sm font-medium text-gray-400 select-none">
                      Tech Stack
                    </h5>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.techStack.map((technology) => (
                      <span className="bg-gray-700 px-4 py-1">
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
                {/* End Tech Stack */}

                {/* Tools */}
                <div className="py-2.5 space-y-2.5">
                  <div>
                    <h5 className="text-sm font-medium text-gray-400 select-none">
                      Tools
                    </h5>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.tools.map((tool) => (
                      <span className="bg-gray-700 px-4 py-1">{tool}</span>
                    ))}
                  </div>
                </div>
                {/* End Tools */}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* End Experience */}

      {/* Projects */}
      <hr />
      <div className="py-5 space-y-5">
        <div>
          <h5 className="text-sm font-medium text-gray-400 select-none">
            Projects
          </h5>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {projects.map((project) => (
            <div className="col-span-1 space-y-3 p-5 border border-gray-700 rounded-lg">
              <a
                href={project.url}
                target="_blank"
                className="text-base font-semibold text-blue-400"
              >
                {project.name}
              </a>
              <p className="text-gray-400 line-clamp-2">
                {project.description}
              </p>
              <div className="text-sm text-gray-300 flex flex-wrap gap-x-4">
                {project.langs.map((lang) => (
                  <div className="flex gap-2">
                    <span className="font-semibold">{lang.name}</span>
                    <span>{lang.percen}%</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* End Projects */}
    </main>
  );
};

export default Resume;
