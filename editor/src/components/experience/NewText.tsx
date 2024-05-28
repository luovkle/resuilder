import { useEffect, useRef, useState } from "react";

interface Props {
  addText: (newText: string) => void;
}

const NewText = ({ addText }: Props) => {
  const [editing, setEditing] = useState(false);
  const [currentNewText, setCurrentNewText] = useState("");
  const [previousNewText, setPreviousNewText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEditing = () => {
    setPreviousNewText(currentNewText);
    setEditing(true);
  };

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentNewText(target.value);
  };

  const handleBlur = () => {
    setCurrentNewText(previousNewText);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (currentNewText?.length === 0) {
        setCurrentNewText(previousNewText);
      } else if (
        currentNewText.length >= 1 &&
        currentNewText !== previousNewText
      ) {
        addText(currentNewText);
      }
      setCurrentNewText("");
      setPreviousNewText("");
      setEditing(false);
    } else if (e.key === "Escape") {
      setCurrentNewText(previousNewText);
      setEditing(false);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setCurrentNewText(previousNewText);
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
          value={currentNewText}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="bg-blue-500 px-2 py-1 rounded-md outline-none"
        />
      ) : (
        <button
          onClick={handleEditing}
          className="bg-blue-600 hover:bg-blue-500 px-4 py-1 rounded-md space-x-2"
        >
          ✨
        </button>
      )}
    </>
  );
};

export default NewText;
