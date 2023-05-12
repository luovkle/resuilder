import React, { KeyboardEvent, useState } from "react";

export const AddSkill = ({
  createSkill,
  setAddNewSkill,
  inputRef,
}: {
  createSkill: (skill: string) => void;
  setAddNewSkill: (arg: boolean) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = (skill: string) => {
    createSkill(skill);
    setNewSkill("");
  };

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setNewSkill(value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && newSkill.trim().length > 0) {
      addSkill(newSkill);
    } else if (event.key === "Escape") {
      setNewSkill("");
      setAddNewSkill(false);
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      className="bg-blue-700 hover:bg-blue-600 px-4 py-1"
      value={newSkill}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="Skill"
    />
  );
};
