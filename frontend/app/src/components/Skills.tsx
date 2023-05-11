import React, { KeyboardEvent, useEffect, useRef, useState } from "react";

import { useSkills } from "../hooks";
import { Section } from "./Section";

export const Skills = () => {
  const { skills, createSkill, updateSkill, deleteSkill } = useSkills();

  const [newSkill, setNewSkill] = useState("");
  const [addNewSkill, setAddNewSkill] = useState(false);

  const [editSkill, setEditSkill] = useState({ id: "", name: "" });

  const skillInputRef = useRef<HTMLInputElement>(null);
  const newSkillInputRef = useRef<HTMLInputElement>(null);

  const addSkill = (skill: string) => {
    createSkill(skill);
    setNewSkill("");
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
    </Section>
  );
};
