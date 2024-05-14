import { useState } from "react";

import DefaultPicture from "./DefaultPicture";

const Experience = () => {
  const [jobs, setJobs] = useState([
    {
      title: "test",
      picture_url: "",
      start_date: "",
      end_date: "",
      details: "",
      responsibilities: ["test"],
      techStack: ["test"],
      tools: ["test"],
    },
  ]);

  return (
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
              {job.picture_url ? (
                <img
                  src={job.picture_url}
                  alt={job.title}
                  className="rounded-full"
                />
              ) : (
                <DefaultPicture title={job.title} />
              )}
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
                    <span className="bg-gray-700 px-4 py-1">{technology}</span>
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
  );
};

export default Experience;
