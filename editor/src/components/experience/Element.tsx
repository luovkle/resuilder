import { useEffect, useRef, useState } from "react";

interface Props {
  idx: number;
  element: string;
  updateElement: (idx: number, element: string) => void;
  deleteElement: (idx: number) => void;
}

const Element = ({ idx, element, updateElement, deleteElement }: Props) => {
  const [editing, setEditing] = useState(false);
  const [currentElement, setCurrentElement] = useState(element);
  const [previousElement, setPreviousElement] = useState(element);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEditing = () => {
    setPreviousElement(currentElement);
    setEditing(true);
  };

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentElement(target.value);
  };

  const handleBlur = () => {
    setCurrentElement(previousElement);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (currentElement?.length === 0) {
        setCurrentElement(previousElement);
      } else if (
        currentElement.length >= 1 &&
        currentElement !== previousElement
      ) {
        updateElement(idx, currentElement);
      }
      setEditing(false);
    } else if (e.key === "Escape") {
      setCurrentElement(previousElement);
      setEditing(false);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setCurrentElement(previousElement);
      setEditing(false);
    }
  };

  const handleDelete = () => {
    deleteElement(idx);
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
          value={currentElement}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="bg-blue-500 px-4 py-1 rounded-md outline-none"
        />
      ) : (
        <div className="bg-blue-600 hover:bg-blue-500 px-4 py-1 rounded-md space-x-2">
          <span onClick={handleEditing}>{currentElement}</span>
          <button type="button" onClick={handleDelete}>
            🔥
          </button>
        </div>
      )}
    </>
  );
};

export default Element;
