import type { JobRead } from "../../services/api";

interface Props {
  job: JobRead;
}

const Responsibilities = ({ job }: Props) => {
  return (
    <div className="py-2.5 space-y-2.5">
      <div>
        <h5 className="text-sm font-medium text-gray-400 select-none">
          Responsibilities
        </h5>
      </div>
      <ul className="pl-10 list-disc">
        {job.responsibilities?.map((responsibility) => (
          <li key={responsibility}>{responsibility}</li>
        ))}
      </ul>
    </div>
  );
};

export default Responsibilities;
