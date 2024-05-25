import { DefaultPicture, Responsibilities, TechStack, Tools } from "./";
import { useJob } from "../../hooks";

const Experience = () => {
  const { jobs } = useJob();

  return (
    <div className="py-5 space-y-5">
      <div>
        <h5 className="text-sm font-medium text-gray-400 select-none">
          Experience
        </h5>
      </div>
      <div className="space-y-5">
        {jobs?.map((job) => (
          <div key={job.id} className="grid grid-cols-12 gap-4">
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
              <Responsibilities job={job} />
              <TechStack job={job} />
              <Tools job={job} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
