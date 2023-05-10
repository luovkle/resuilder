import React, { useEffect, useRef } from "react";

import { RepositoryRead, RepositoryUpdate } from "../../client";

interface Props {
  showMenu: (arg0: boolean) => void;
  repositories: RepositoryRead[];
  updateRepository: (id: string, repository: RepositoryUpdate) => void;
}

export const Select = ({ showMenu, repositories, updateRepository }: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = ({ target }: MouseEvent) => {
    !cardRef.current?.contains(target as Node) && showMenu(false);
  };

  const handleKey = ({ key }: KeyboardEvent) => {
    key === "Escape" && showMenu(false);
  };

  const handleChange = (
    { target: { id } }: React.ChangeEvent<HTMLInputElement>,
  ) => {
    updateRepository(id, {
      show: !repositories.find((repository) => repository._id === id)?.show,
    });
  };

  useEffect(() => {
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div>
      <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
        <div
          ref={cardRef}
          className="bg-gray-900 rounded-lg border border-gray-700 h-2/3 w-1/2"
        >
          <div className="mt-4 mx-4">
            {repositories.map((repository) => (
              <div
                key={repository._id}
                className="hover:bg-gray-800 rounded flex items-center"
              >
                <input
                  id={repository._id}
                  type="checkbox"
                  checked={repository.show}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <label htmlFor={repository._id} className="ml-2 w-full">
                  {repository.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
