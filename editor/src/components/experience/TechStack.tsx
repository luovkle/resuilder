import type { JobRead } from "../../services/api";
import { Tag } from "./";

interface Props {
  job: JobRead;
}

const TechStack = ({ job }: Props) => {
  return (
    <div className="py-2.5 space-y-2.5">
      <div>
        <h5 className="text-sm font-medium text-gray-400 select-none">
          Tech Stack
        </h5>
      </div>
      <div className="flex flex-wrap gap-2">
        {job.tech_stack?.map((technology) => (
          <Tag key={technology} content={technology} />
        ))}
      </div>
    </div>
  );
};

export default TechStack;
