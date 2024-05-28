import type { JobRead } from "../../services/api";
import NewText from "./NewText";
import Text from "./Text";

interface Props {
  job: JobRead;
  updateResponsibilities: (id: string, responsibilities: string[]) => void;
}

const Responsibilities = ({ job, updateResponsibilities }: Props) => {
  const addResponsibility = (responsibility: string) => {
    updateResponsibilities(job.id, [
      ...(job.responsibilities || []),
      responsibility,
    ]);
  };

  const updateResponsibility = (idx: number, responsibility: string) => {
    updateResponsibilities(
      job.id,
      job.responsibilities?.map((cResponsibility, cIdx) =>
        cIdx === idx ? responsibility : cResponsibility,
      ) || [],
    );
  };

  const deleteResponsibility = (idx: number) => {
    updateResponsibilities(
      job.id,
      job.responsibilities?.filter((_, cIdx) => cIdx !== idx) || [],
    );
  };

  return (
    <div className="py-2.5 space-y-2.5">
      <div>
        <h5 className="text-sm font-medium text-gray-400 select-none">
          Responsibilities
        </h5>
      </div>
      {job.responsibilities && job.responsibilities?.length > 0 ? (
        <ul className="pl-10 list-disc">
          {job.responsibilities?.map((responsibility, idx) => (
            <li key={responsibility}>
              <Text
                idx={idx}
                text={responsibility}
                updateText={updateResponsibility}
                deleteText={deleteResponsibility}
              />
            </li>
          ))}
          <li>
            <div className="mt-2">
              <NewText addText={addResponsibility} />
            </div>
          </li>
        </ul>
      ) : (
        <div className="mt-2">
          <NewText addText={addResponsibility} />
        </div>
      )}
    </div>
  );
};

export default Responsibilities;
