import React, { useState, KeyboardEvent, useRef, useEffect } from "react";

import { Picture } from "./Picture";
import { name, content } from "../summary.json";
import { url } from "../picture.json";

export const Summary = () => {
  const [summary, setSummary] = useState({ name, content });
  const [edit, setEdit] = useState({
    name: false,
    content: false,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleClickName = () => {
    setEdit({ content: false, name: true });
  };

  const handleCLickContent = () => {
    setEdit({ name: false, content: true });
  };

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSummary({ ...summary, [name]: value });
  };

  const onKeyDown = (
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" || event.key === "Escape")
      setEdit({ name: false, content: false });
  };

  useEffect(() => {
    if (edit.name && inputRef.current) {
      inputRef.current.focus();
    } else if (edit.content && textareaRef.current) {
      const end = summary.content.length;
      textareaRef.current.setSelectionRange(end, end);
      textareaRef.current.focus();
    }
  }, [edit]);

  return (
    <div className="grid grid-cols-12 gap-5 py-5">
      <div className="col-span-2">
        <Picture url={url} alt={summary.name} />
      </div>
      <div className="col-span-10 space-y-1.5">
        {edit.name ? (
          <input
            ref={inputRef}
            type="text"
            name="name"
            className="bg-gray-700 text-2xl font-bold w-full"
            value={summary.name}
            onChange={handleChange}
            onKeyDown={onKeyDown}
          />
        ) : (
          <h1 onClick={handleClickName} className="text-2xl font-bold">
            {summary.name}
          </h1>
        )}
        {edit.content ? (
          <textarea
            ref={textareaRef}
            name="content"
            rows={4}
            className="bg-gray-700 w-full"
            value={summary.content}
            onChange={handleChange}
            onKeyDown={onKeyDown}
          ></textarea>
        ) : (
          <p onClick={handleCLickContent} className="text-gray-300">
            {summary.content}
          </p>
        )}
      </div>
    </div>
  );
};
