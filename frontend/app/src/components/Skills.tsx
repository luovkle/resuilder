import React, { KeyboardEvent, useEffect, useRef, useState } from "react";

import { useSkills } from "../hooks";
import { Section } from "./Section";
import { AddSkill } from "./skills/AddSkill";

export const Skills = () => {
  const { skills, createSkill, updateSkill, deleteSkill } = useSkills();
  const [addNewSkill, setAddNewSkill] = useState(false);
  const [editSkill, setEditSkill] = useState({ id: "", name: "" });

  const skillInputRef = useRef<HTMLInputElement>(null);
  const newSkillInputRef = useRef<HTMLInputElement>(null);

  const handleClick = ({
    currentTarget: { id, textContent },
  }: React.MouseEvent<HTMLSpanElement>) => {
    setEditSkill({ id, name: textContent || "" });
  };

  const handleChangeUpdate = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setEditSkill({ ...editSkill, name: value });
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
    if (editSkill.id) skillInputRef.current?.focus();
  }, [editSkill.id]);

  useEffect(() => {
    if (addNewSkill) newSkillInputRef.current?.focus();
  }, [addNewSkill]);

  return (
    <Section name="Tech Stack">
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) =>
          skill._id === editSkill.id ? (
            <input
              key={skill._id}
              ref={skillInputRef}
              type="text"
              className="bg-gray-700"
              value={editSkill.name}
              onChange={handleChangeUpdate}
              onKeyDown={handleKeyDownUpdate}
            />
          ) : (
            <span
              key={skill._id}
              id={skill._id}
              onClick={handleClick}
              className="bg-gray-700 px-4 py-1"
            >
              {skill.name}
            </span>
          )
        )}
        {addNewSkill ? (
          <AddSkill
            createSkill={createSkill}
            setAddNewSkill={(arg: boolean) => setAddNewSkill(arg)}
            inputRef={newSkillInputRef}
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
    </Section>
  );
};
