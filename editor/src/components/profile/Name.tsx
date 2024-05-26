import { useEffect, useRef, useState } from "react";

interface Props {
  name?: string;
}

const Name = ({ name }: Props) => {
  const [editing, setEditing] = useState(false);
  const [currentName, setCurrentName] = useState(name);
  const [previousName, setPreviousName] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEditing = () => {
    setPreviousName(currentName);
    setEditing(true);
  };

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentName(target.value);
  };

  const handleBlur = () => {
    setCurrentName(previousName);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (currentName?.length === 0) {
        setCurrentName(previousName);
      }
      setEditing(false);
    } else if (e.key === "Escape") {
      setCurrentName(previousName);
      setEditing(false);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setCurrentName(previousName);
      setEditing(false);
    }
  };

  useEffect(() => {
    if (editing) {
      document.addEventListener("mousedown", handleClickOutside);
      inputRef.current?.focus();
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editing]);

  return (
    <>
      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={currentName}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="text-2xl font-bold bg-transparent outline-none w-full"
        />
      ) : (
        <h2 className="text-2xl font-bold break-words" onClick={handleEditing}>
          {currentName}
        </h2>
      )}
    </>
  );
};

export default Name;
