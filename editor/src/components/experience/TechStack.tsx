import type { JobRead } from "../../services/api";
import Element from "./Element";
import NewElement from "./NewElement";

interface Props {
  job: JobRead;
  updateTechStack: (id: string, techStack: string[]) => void;
}

const TechStack = ({ job, updateTechStack }: Props) => {
  const addElement = (element: string) => {
    updateTechStack(job.id, [...(job.tech_stack || []), element]);
  };

  const updateElement = (idx: number, element: string) => {
    updateTechStack(
      job.id,
      job.tech_stack?.map((skill, cIdx) => (cIdx === idx ? element : skill)) ||
      [],
    );
  };

  const deleteElement = (idx: number) => {
    updateTechStack(
      job.id,
      job.tech_stack?.filter((_, cIdx) => cIdx !== idx) || [],
    );
  };

  return (
    <div className="py-2.5 space-y-2.5">
      <div>
        <h5 className="text-sm font-medium text-gray-400 select-none">
          Tech Stack
        </h5>
      </div>
      <div className="flex flex-wrap gap-2">
        {job.tech_stack?.map((technology, idx) => (
          <Element
            key={technology}
            idx={idx}
            element={technology}
            updateElement={updateElement}
            deleteElement={deleteElement}
          />
        ))}
        <NewElement addElement={addElement} />
      </div>
    </div>
  );
};

export default TechStack;
