import { DefaultPicture, Responsibilities, TechStack, Tools } from "./";
import { useJob } from "../../hooks";
import Skeleton from "./Skeleton";
import Title from "./Title";
import Date from "./Date";
import Details from "./Details";

const Experience = () => {
  const { jobs, isLoading, updateJob, createJob, deleteJob } = useJob();

  const updateTitle = (id: string, title: string) => {
    updateJob({
      id,
      data: {
        title,
      },
    });
  };

  const updateStartDate = (id: string, startDate: string) => {
    updateJob({
      id,
      data: {
        start_date: startDate,
      },
    });
  };

  const updateEndDate = (id: string, endDate: string) => {
    updateJob({
      id,
      data: {
        end_date: endDate,
      },
    });
  };

  const updateDetails = (id: string, details: string) => {
    updateJob({
      id,
      data: {
        details,
      },
    });
  };

  const updateTechStack = (id: string, techStack: string[]) => {
    updateJob({
      id,
      data: {
        tech_stack: techStack,
      },
    });
  };

  const updateTools = (id: string, tools: string[]) => {
    updateJob({
      id,
      data: {
        tools,
      },
    });
  };

  const updateResponsibilities = (id: string, responsibilities: string[]) => {
    updateJob({
      id,
      data: {
        responsibilities,
      },
    });
  };

  const handleCreateJob = () => {
    createJob({
      title: "Title",
      start_date: "start date",
      end_date: "end date",
      details: "Details",
    });
  };

  const handleDeleteJob = (id: string) => {
    deleteJob(id);
  };

  return (
    <div className="py-5 space-y-5">
      <div className="flex justify-between items-center">
        <h5 className="text-sm font-medium text-gray-400 select-none">
          Experience
        </h5>
        <button
          onClick={() => handleCreateJob()}
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 py-1 px-2 rounded-md"
        >
          ✨
        </button>
      </div>
      {isLoading ? (
        <Skeleton />
      ) : (
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
                    <div className="flex justify-between">
                      <Title
                        id={job.id}
                        title={job.title}
                        updateTitle={updateTitle}
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteJob(job.id)}
                        className="bg-blue-600 hover:bg-blue-500 py-1 px-2 rounded-md"
                      >
                        🔥
                      </button>
                    </div>
                    <p className="text-gray-400 text-sm">
                      <span className="flex space-x-1">
                        <Date
                          id={job.id}
                          date={job.start_date}
                          updateDate={updateStartDate}
                        />
                        <span> - </span>
                        <Date
                          id={job.id}
                          date={job.end_date || "Present"}
                          updateDate={updateEndDate}
                        />
                      </span>
                    </p>
                  </div>
                  <div>
                    <Details
                      id={job.id}
                      details={job.details}
                      updateDetails={updateDetails}
                    />
                  </div>
                </div>
                <Responsibilities
                  job={job}
                  updateResponsibilities={updateResponsibilities}
                />
                <TechStack job={job} updateTechStack={updateTechStack} />
                <Tools job={job} updateTools={updateTools} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Experience;
