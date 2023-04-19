import React, { useState, useRef, useEffect, KeyboardEvent } from "react";

import { useAbout } from "../hooks";

export const About = () => {
  const { about, updateAbout } = useAbout({ about: "" });
  const [tempAbout, setTempAbout] = useState(about);
  const [edit, setEdit] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleClick = () => {
    setEdit(true);
  };

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTempAbout({ about: value });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" || event.key === "Escape") {
      if (tempAbout !== about && tempAbout.about) updateAbout(tempAbout.about);
      setEdit(false);
    }
  };

  useEffect(() => {
    if (edit && textareaRef.current) {
      if (about.about) {
        const end = about.about.length;
        textareaRef.current.setSelectionRange(end, end);
      }
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
            value={tempAbout.about}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          ></textarea>
        ) : (
          <p onClick={handleClick} className="text-gray-300">
            {about.about || "[Empty]"}
          </p>
        )}
      </div>
    </div>
  );
};
