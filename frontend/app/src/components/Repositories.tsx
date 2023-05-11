import { useState } from "react";
import { useRepositories } from "../hooks";

import { Select } from "./repositories/Select";
import { Section } from "./Section";

export const Repositories = () => {
  const { repositories, updateRepository } = useRepositories();
  const [renderOptions, setRenderOptions] = useState(false);

  return (
    <Section name="Repositories" onMenu={() => setRenderOptions(true)}>
      <div className="grid grid-cols-2 gap-4">
        {repositories.map(
          (repository) =>
            repository.show && (
              <div
                key={repository._id}
                className="col-span-1 space-y-3 p-5 border border-gray-700 rounded-lg"
              >
                <a
                  href={repository.url}
                  target="_blank"
                  className="text-base font-semibold text-blue-400"
                >
                  {repository.name}
                </a>
                <p className="text-gray-400 truncate">
                  {repository.description}
                </p>
                <div className="space-x-5 text-sm text-gray-300">
                  <span className="font-semibold">{repository.lang}</span>
                  <span>Stars: {repository.stars}</span>
                  <span>Forks: {repository.forks}</span>
                </div>
              </div>
            )
        )}
      </div>
      {renderOptions && (
        <Select
          showMenu={setRenderOptions}
          repositories={repositories}
          updateRepository={updateRepository}
        />
      )}
    </Section>
  );
};
