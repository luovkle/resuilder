import { useEffect, useRef, useState } from "react";

interface Props {
  id: string;
  date: string;
  updateDate: (id: string, date: string) => void;
}

const Date = ({ id, date, updateDate }: Props) => {
  const [editing, setEditing] = useState(false);
  const [currentDate, setCurrentDate] = useState(date);
  const [previousDate, setPreviousDate] = useState(date);
  const inputRef = useRef<HTMLInputElement>(null);
  const textWidthRef = useRef<HTMLSpanElement>(null);

  const handleEditing = () => {
    setPreviousDate(currentDate);
    setEditing(true);
  };

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentDate(target.value);
  };

  const handleBlur = () => {
    setCurrentDate(previousDate);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (currentDate?.length === 0) {
        setCurrentDate(previousDate);
      } else if (currentDate.length >= 1 && currentDate !== previousDate) {
        updateDate(id, currentDate);
      }
      setEditing(false);
    } else if (e.key === "Escape") {
      setCurrentDate(previousDate);
      setEditing(false);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setCurrentDate(previousDate);
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

  useEffect(() => {
    if (textWidthRef.current && inputRef.current) {
      textWidthRef.current.textContent =
        currentDate || inputRef.current.placeholder;
      inputRef.current.style.width = `${textWidthRef.current.offsetWidth}px`;
    }
  }, [currentDate, editing]);

  return (
    <>
      {editing ? (
        <>
          <input
            ref={inputRef}
            type="text"
            value={currentDate}
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
        <span onClick={handleEditing}>{currentDate}</span>
      )}
    </>
  );
};

export default Date;
