import { Tag } from "./";

interface Props {
  job: { tools: string[] };
}

const Tools = ({ job }: Props) => {
  return (
    <div className="py-2.5 space-y-2.5">
      <div>
        <h5 className="text-sm font-medium text-gray-400 select-none">Tools</h5>
      </div>
      <div className="flex flex-wrap gap-2">
        {job.tools.map((tool) => (
          <Tag key={tool} content={tool} />
        ))}
      </div>
    </div>
  );
};

export default Tools;
