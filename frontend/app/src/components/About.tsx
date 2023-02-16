import React, { useState, useRef, useEffect, KeyboardEvent } from "react";

import { about as data } from "../about.json";

export const About = () => {
  const [about, setAbout] = useState(data);
  const [edit, setEdit] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleClick = () => {
    setEdit(true);
  };

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAbout(value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" || event.key === "Escape") setEdit(false);
  };

  useEffect(() => {
    if (edit && textareaRef.current) {
      const end = about.length;
      textareaRef.current.setSelectionRange(end, end);
      textareaRef.current.focus();
    }
  }, [edit]);

  return (
    <div className="py-5 space-y-5">
      <div>
        <h5 className="text-sm font-medium text-gray-400">About</h5>
      </div>
      <div>
        {edit ? (
          <textarea
            rows={4}
            className="bg-gray-700 w-full"
            ref={textareaRef}
            value={about}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          ></textarea>
        ) : (
          <p onClick={handleClick} className="text-gray-300">
            {about}
          </p>
        )}
      </div>
    </div>
  );
};
