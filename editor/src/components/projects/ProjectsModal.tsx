import React, { useState, useEffect } from "react";
import { ProjectRead } from "../../services/api";

interface ProjectsModalProps {
  projects: ProjectRead[];
  updateProjects: (projects: ProjectRead[]) => void;
}

const ProjectsModal: React.FC<ProjectsModalProps> = ({
  projects,
  updateProjects,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProjects, setCurrentProjects] = useState<ProjectRead[]>([]);
  const [previousProjects, setPreviousProjects] = useState<ProjectRead[]>([]);

  useEffect(() => {
    setCurrentProjects([...projects]);
    setPreviousProjects([...projects]);
  }, [projects]);

  const handleCheckboxChange = (id: string) => {
    setCurrentProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id ? { ...project, public: !project.public } : project,
      ),
    );
  };

  const handleSave = () => {
    const modifiedProjects = currentProjects.filter(
      (currentProject, index) =>
        currentProject.public !== previousProjects[index].public,
    );
    if (modifiedProjects.length >= 1) {
      updateProjects(modifiedProjects);
    }
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setCurrentProjects([...previousProjects]);
    setIsModalOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>🔧</button>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
          onClick={handleClose}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <div
            className="bg-gray-900 rounded-lg shadow-lg p-8 w-1/2 space-y-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Projects</h2>
            </div>
            <div className="space-y-2">
              {currentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between select-none"
                >
                  <label
                    htmlFor={project.id}
                    className={`font-medium w-full py-2 px-4 rounded-md border-2 cursor-pointer	${project.public ? "bg-blue-600 hover:bg-blue-500 border-transparent" : "border-gray-700 hover:border-blue-500"}`}
                  >
                    {project.name}
                  </label>
                  <input
                    id={project.id}
                    type="checkbox"
                    hidden={true}
                    checked={project.public}
                    onChange={() => handleCheckboxChange(project.id)}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                className="border-blue-600 border-2 hover:border-blue-500 py-2 px-4 rounded-lg cursor-pointer"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-500 py-2 px-4 rounded-lg"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsModal;
