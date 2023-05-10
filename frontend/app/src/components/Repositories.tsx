import { useState } from "react";
import { useRepositories } from "../hooks";

import { Select } from "./repositories/Select";

export const Repositories = () => {
  const { repositories, updateRepository } = useRepositories();
  const [renderOptions, setRenderOptions] = useState(false);

  return (
    <div className="py-5 space-y-5">
      <div className="flex justify-between">
        <h5 className="text-sm font-medium text-gray-400">Repositories</h5>
        <button
          type="button"
          className="fill-gray-400 hover:fill-gray-200"
          onClick={() => setRenderOptions(true)}
        >
          <svg
            width="20px"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
          </svg>{" "}
        </button>
      </div>
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
    </div>
  );
};
