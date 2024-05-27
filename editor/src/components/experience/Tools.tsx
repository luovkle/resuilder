import type { JobRead } from "../../services/api";
import Element from "./Element";
import NewElement from "./NewElement";

interface Props {
  job: JobRead;
  updateTools: (id: string, tools: string[]) => void;
}

const Tools = ({ job, updateTools }: Props) => {
  const addElement = (element: string) => {
    updateTools(job.id, [...(job.tools || []), element]);
  };

  const updateElement = (idx: number, element: string) => {
    updateTools(
      job.id,
      job.tools?.map((skill, cIdx) => (cIdx === idx ? element : skill)) || [],
    );
  };

  const deleteElement = (idx: number) => {
    updateTools(job.id, job.tools?.filter((_, cIdx) => cIdx !== idx) || []);
  };

  return (
    <div className="py-2.5 space-y-2.5">
      <div>
        <h5 className="text-sm font-medium text-gray-400 select-none">Tools</h5>
      </div>
      <div className="flex flex-wrap gap-2">
        {job.tools?.map((tool, idx) => (
          <Element
            key={tool}
            idx={idx}
            element={tool}
            updateElement={updateElement}
            deleteElement={deleteElement}
          />
        ))}
        <NewElement addElement={addElement} />
      </div>
    </div>
  );
};

export default Tools;
