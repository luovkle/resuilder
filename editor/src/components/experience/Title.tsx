import { useEffect, useRef, useState } from "react";

interface Props {
  id: string;
  title: string;
  updateTitle: (id: string, title: string) => void;
}

const Title = ({ id, title, updateTitle }: Props) => {
  const [editing, setEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [previousTitle, setPreviousTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEditing = () => {
    setPreviousTitle(currentTitle);
    setEditing(true);
  };

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(target.value);
  };

  const handleBlur = () => {
    setCurrentTitle(previousTitle);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (currentTitle?.length === 0) {
        setCurrentTitle(previousTitle);
      } else if (currentTitle.length >= 1 && currentTitle !== previousTitle) {
        updateTitle(id, currentTitle);
      }
      setEditing(false);
    } else if (e.key === "Escape") {
      setCurrentTitle(previousTitle);
      setEditing(false);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setCurrentTitle(previousTitle);
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
          value={currentTitle}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="text-lg font-semibold bg-transparent outline-none w-full"
        />
      ) : (
        <h3 className="text-lg font-semibold" onClick={handleEditing}>
          {currentTitle}
        </h3>
      )}
    </>
  );
};

export default Title;
