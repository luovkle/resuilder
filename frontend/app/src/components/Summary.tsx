import { useState, useRef, useEffect } from "react";

import { Picture } from "./Picture";
import { Content } from "./profile/Content";
import { Name } from "./profile/Name";
import { EditName } from "./profile/EditName";
import { EditContent } from "./profile/EditContent";
import { name, content } from "../summary.json";
import { url } from "../picture.json";

export const Summary = () => {
  const [summary, setSummary] = useState({ name, content, picture_url: url });
  const [edit, setEdit] = useState({
    name: false,
    content: false,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const editContent = (arg: boolean) => {
    setEdit((edit) => ({ ...edit, content: arg }));
  };

  const editName = (arg: boolean) => {
    setEdit((edit) => ({ ...edit, name: arg }));
  };

  const newName = (arg: string) => {
    setSummary((summary) => ({ ...summary, name: arg }));
  };

  const newContent = (arg: string) => {
    setSummary((summary) => ({ ...summary, content: arg }));
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
          <EditName
            inputRef={inputRef}
            currentName={summary.name}
            editName={editName}
            newName={newName}
          />
        ) : (
          <Name name={summary.name} editName={editName} />
        )}
        {edit.content ? (
          <EditContent
            textareaRef={textareaRef}
            currentContent={summary.content}
            editContent={editContent}
            newContent={newContent}
          />
        ) : (
          <Content content={summary.content} editContent={editContent} />
        )}
      </div>
    </div>
  );
};
