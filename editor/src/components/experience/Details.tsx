import { useEffect, useRef, useState } from "react";

interface Props {
  id: string;
  details: string;
  updateDetails: (id: string, details: string) => void;
}

const Details = ({ id, details, updateDetails }: Props) => {
  const [editing, setEditing] = useState(false);
  const [currentDetails, setCurrentDetails] = useState(details);
  const [previousDetails, setPreviousDetails] = useState(details);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEditing = () => {
    setPreviousDetails(currentDetails);
    setEditing(true);
  };

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentDetails(target.value);
  };

  const handleBlur = () => {
    setCurrentDetails(previousDetails);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (currentDetails?.length === 0) {
        setCurrentDetails(previousDetails);
      } else if (
        currentDetails.length >= 1 &&
        currentDetails !== previousDetails
      ) {
        updateDetails(id, currentDetails);
      }
      setEditing(false);
    } else if (e.key === "Escape") {
      setCurrentDetails(previousDetails);
      setEditing(false);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setCurrentDetails(previousDetails);
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
          value={currentDetails}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="text-gray-400 bg-transparent outline-none w-full"
        />
      ) : (
        <p className="text-gray-400" onClick={handleEditing}>
          {currentDetails}
        </p>
      )}
    </>
  );
};

export default Details;
