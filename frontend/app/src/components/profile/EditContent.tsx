import React, { KeyboardEvent, useState } from "react";

interface Props {
  currentContent?: string;
  editContent: (arg: boolean) => void;
  newContent: (arg: string) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

export const EditContent = ({
  currentContent,
  editContent,
  newContent,
  textareaRef,
}: Props) => {
  const [content, setContentent] = useState(currentContent || "");

  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContentent(target.value);
  };

  const onKeyDown = (
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.key === "Enter" && newContent(content);
      editContent(false);
    }
  };

  return (
    <textarea
      ref={textareaRef}
      name="content"
      rows={4}
      className="bg-gray-700 w-full"
      value={content}
      onChange={handleChange}
      onKeyDown={onKeyDown}
    ></textarea>
  );
};
