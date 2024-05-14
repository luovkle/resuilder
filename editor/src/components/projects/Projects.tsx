import { useState } from "react";

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      id: "1",
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
    <div className="py-5 space-y-5">
      <div>
        <h5 className="text-sm font-medium text-gray-400 select-none">
          Projects
        </h5>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="col-span-1 space-y-3 p-5 border border-gray-700 rounded-lg"
          >
            <a
              href={project.url}
              target="_blank"
              className="text-base font-semibold text-blue-400"
            >
              {project.name}
            </a>
            <p className="text-gray-400 line-clamp-2">{project.description}</p>
            <div className="text-sm text-gray-300 flex flex-wrap gap-x-4">
              {project.langs.map((lang) => (
                <div key={lang.name} className="flex gap-2">
                  <span className="font-semibold">{lang.name}</span>
                  <span>{lang.percen}%</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;