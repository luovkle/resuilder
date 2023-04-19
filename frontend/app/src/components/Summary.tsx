import { useState, useRef, useEffect } from "react";

import { Picture } from "./Picture";
import { Name, Content, EditName, EditContent } from "./profile";
import { useProfile } from "../hooks";

export const Summary = () => {
  const { profile, newName, newContent, newPicture } = useProfile({
    name: "",
    content: "",
    picture_url: "",
  });
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

  useEffect(() => {
    if (edit.name && inputRef.current) {
      inputRef.current.focus();
    } else if (edit.content && textareaRef.current) {
      const end = profile.content.length;
      textareaRef.current.setSelectionRange(end, end);
      textareaRef.current.focus();
    }
  }, [edit]);

  return (
    <div className="grid grid-cols-12 gap-5 py-5">
      <div className="col-span-2">
        <Picture
          picture_url={profile.picture_url}
          alt={profile.name}
          newPicture={newPicture}
        />
      </div>
      <div className="col-span-10 space-y-1.5">
        {edit.name ? (
          <EditName
            inputRef={inputRef}
            currentName={profile.name}
            editName={editName}
            newName={newName}
          />
        ) : (
          <Name name={profile.name} editName={editName} />
        )}
        {edit.content ? (
          <EditContent
            textareaRef={textareaRef}
            currentContent={profile.content}
            editContent={editContent}
            newContent={newContent}
          />
        ) : (
          <Content content={profile.content} editContent={editContent} />
        )}
      </div>
    </div>
  );
};
