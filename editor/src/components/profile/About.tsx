import { useEffect, useRef, useState } from "react";

interface Props {
  about?: string;
}

const About = ({ about }: Props) => {
  const [editing, setEditing] = useState(false);
  const [currentAbout, setCurrentAbout] = useState(about);
  const [previousAbout, setPreviousAbout] = useState(about);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEditing = () => {
    setPreviousAbout(currentAbout);
    setEditing(true);
  };

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentAbout(target.value);
  };

  const handleBlur = () => {
    setCurrentAbout(previousAbout);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (currentAbout?.length === 0) {
        setCurrentAbout(previousAbout);
      }
      setEditing(false);
    } else if (e.key === "Escape") {
      setCurrentAbout(previousAbout);
      setEditing(false);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setCurrentAbout(previousAbout);
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
          value={currentAbout}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="text-gray-300 bg-transparent outline-none w-full"
        />
      ) : (
        <p className="text-gray-300" onClick={handleEditing}>
          {currentAbout}
        </p>
      )}
    </>
  );
};

export default About;
