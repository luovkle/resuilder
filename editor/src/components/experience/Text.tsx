import { useEffect, useRef, useState } from "react";

interface Props {
  idx: number;
  text: string;
  updateText: (idx: number, text: string) => void;
  deleteText: (idx: number) => void;
}

const Text = ({ idx, text, updateText, deleteText }: Props) => {
  const [editing, setEditing] = useState(false);
  const [currentText, setCurrentText] = useState(text);
  const [previousText, setPreviousText] = useState(text);
  const inputRef = useRef<HTMLInputElement>(null);
  const textWidthRef = useRef<HTMLSpanElement>(null);

  const handleEditing = () => {
    setPreviousText(currentText);
    setEditing(true);
  };

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentText(target.value);
  };

  const handleBlur = () => {
    setCurrentText(previousText);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (currentText?.length === 0) {
        setCurrentText(previousText);
      } else if (currentText.length >= 1 && currentText !== previousText) {
        updateText(idx, currentText);
      }
      setEditing(false);
    } else if (e.key === "Escape") {
      setCurrentText(previousText);
      setEditing(false);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setCurrentText(previousText);
      setEditing(false);
    }
  };

  const handleDelete = () => {
    deleteText(idx);
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

  useEffect(() => {
    if (textWidthRef.current && inputRef.current) {
      textWidthRef.current.textContent =
        currentText || inputRef.current.placeholder;
      inputRef.current.style.width = `${textWidthRef.current.offsetWidth}px`;
    }
  }, [currentText, editing]);

  return (
    <>
      {editing ? (
        <>
          <input
            ref={inputRef}
            type="text"
            value={currentText}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="bg-transparent outline-none"
            style={{ minWidth: "1ch" }}
          />
          <span
            ref={textWidthRef}
            className="invisible whitespace-pre absolute"
          ></span>
        </>
      ) : (
        <div className="space-x-2 space-y-2">
          <span onClick={handleEditing}>{currentText}</span>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-blue-600 hover:bg-blue-500 px-4 py-1 rounded-md"
          >
            🔥
          </button>
        </div>
      )}
    </>
  );
};

export default Text;
