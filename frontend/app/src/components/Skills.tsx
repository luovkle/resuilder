import React, { useState, KeyboardEvent, useRef, useEffect } from "react";
import { v4 as uuid4 } from "uuid";

import { skills as data } from "../skills.json";

export const Skills = () => {
  const [skills, setSkills] = useState(data);

  const [newSkill, setNewSkill] = useState("");
  const [addNewSkill, setAddNewSkill] = useState(false);

  const [editSkill, setEditSkill] = useState({ id: "", name: "" });

  const skillInputRef = useRef<HTMLInputElement>(null);
  const newSkillInputRef = useRef<HTMLInputElement>(null);

  const addSkill = (skill: string) => {
    setSkills([...skills, { id: uuid4().toString(), name: skill }]);
    setNewSkill("");
  };

  const updateSkill = (id: string, name: string) => {
    setSkills(
      skills.map((skill) => {
        return skill.id === id ? { id, name } : skill;
      })
    );
  };

  const deleteSkill = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  const handleClick = ({
    currentTarget: { id, textContent },
  }: React.MouseEvent<HTMLSpanElement>) => {
    setEditSkill({ id, name: textContent || "" });
  };

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setNewSkill(value);
  };

  const handleChangeUpdate = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setEditSkill({ ...editSkill, name: value });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && newSkill.trim().length > 0) {
      addSkill(newSkill);
    } else if (event.key === "Escape") {
      setNewSkill("");
      setAddNewSkill(false);
    }
  };

  const handleKeyDownUpdate = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      editSkill.name.length > 0
        ? updateSkill(editSkill.id, editSkill.name)
        : deleteSkill(editSkill.id);
      setEditSkill({ id: "", name: "" });
    } else if (event.key === "Escape") {
      setEditSkill({ id: "", name: "" });
    }
  };

  const handleAddSkill = () => setAddNewSkill(true);

  useEffect(() => {
    if (editSkill.id) {
      skillInputRef.current?.focus();
    } else if (addNewSkill) {
      newSkillInputRef.current?.focus();
    }
  }, [editSkill.id, addNewSkill]);

  return (
    <div className="py-5 space-y-5">
      <div>
        <h5 className="text-sm font-medium text-gray-400">Tech Stack</h5>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) =>
          skill.id === editSkill.id ? (
            <input
              ref={skillInputRef}
              type="text"
              className="bg-gray-700"
              value={editSkill.name}
              onChange={handleChangeUpdate}
              onKeyDown={handleKeyDownUpdate}
            />
          ) : (
            <span
              key={skill.id}
              id={skill.id}
              onClick={handleClick}
              className="bg-gray-700 px-4 py-1"
            >
              {skill.name}
            </span>
          )
        )}
        {addNewSkill ? (
          <input
            ref={newSkillInputRef}
            type="text"
            className="bg-blue-700 hover:bg-blue-600 px-4 py-1"
            value={newSkill}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Skill"
          />
        ) : (
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-500 px-4 py-1"
            onClick={handleAddSkill}
          >
            +
          </button>
        )}
      </div>
    </div>
  );
};
