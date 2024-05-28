import { useEffect, useRef, useState } from "react";

interface Props {
  addElement: (newElement: string) => void;
}

const NewElement = ({ addElement }: Props) => {
  const [editing, setEditing] = useState(false);
  const [currentNewElement, setCurrentNewElement] = useState("");
  const [previousNewElement, setPreviousNewElement] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEditing = () => {
    setPreviousNewElement(currentNewElement);
    setEditing(true);
  };

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentNewElement(target.value);
  };

  const handleBlur = () => {
    setCurrentNewElement(previousNewElement);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (currentNewElement?.length === 0) {
        setCurrentNewElement(previousNewElement);
      } else if (
        currentNewElement.length >= 1 &&
        currentNewElement !== previousNewElement
      ) {
        addElement(currentNewElement);
      }
      setCurrentNewElement("");
      setPreviousNewElement("");
      setEditing(false);
    } else if (e.key === "Escape") {
      setCurrentNewElement(previousNewElement);
      setEditing(false);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setCurrentNewElement(previousNewElement);
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
          value={currentNewElement}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="bg-blue-500 px-4 py-1 rounded-md outline-none"
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

export default NewElement;
