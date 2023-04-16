import React, { useEffect, useRef } from "react";

interface Repository {
  id: string;
  name: string;
  url: string;
  description: string;
  lang: string;
  stars: number;
  forks: number;
  use: boolean;
}

interface Props {
  showMenu: (arg0: boolean) => void;
  repositories: Repository[];
  setRepositories: (arg0: Repository[]) => void;
}

export const Select = ({ showMenu, repositories, setRepositories }: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = ({ target }: MouseEvent) => {
    !cardRef.current?.contains(target as Node) && showMenu(false);
  };

  const handleKey = ({ key }: KeyboardEvent) => {
    key === "Escape" && showMenu(false);
  };

  const handleChange = ({ target: { id } }: React.ChangeEvent<HTMLInputElement>) => {
    // setRepositories((repositories) => {
    //   return repositories.map((repository) =>
    //     repository.id === id
    //       ? { ...repository, use: !repository.use }
    //       : repository
    //   );
    // });
    setRepositories(
      repositories.map((repository) =>
        repository.id === id
          ? { ...repository, use: !repository.use }
          : repository
      )
    );
    console.log(id)
  };

  useEffect(() => {
    document.addEventListener("click", handleClick, true);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("click", handleClick, true);
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
                key={repository.id}
                className="hover:bg-gray-800 rounded flex items-center"
              >
                <input
                  id={repository.id}
                  type="checkbox"
                  checked={repository.use}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <label htmlFor={repository.id} className="ml-2 w-full">
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
