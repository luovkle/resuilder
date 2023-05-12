import React, { KeyboardEvent, useState, useEffect } from "react";

interface Props {
  currentName: string;
  editName: (arg: boolean) => void;
  newName: (arg: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const EditName = ({
  currentName,
  newName,
  editName,
  inputRef,
}: Props) => {
  const [name, setName] = useState(currentName);

  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setName(target.value);
  };

  const onKeyDown = (
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.key === "Enter" && newName(name);
      editName(false);
    }
  };

  const handleClick = ({ target }: MouseEvent) => {
    !inputRef.current?.contains(target as Node) && editName(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      name="name"
      className="bg-gray-700 text-2xl font-bold w-full"
      value={name}
      onChange={handleChange}
      onKeyDown={onKeyDown}
    />
  );
};
