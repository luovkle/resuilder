import { useEffect, useRef, useState } from "react";

import { useAbout } from "../hooks";
import { Content, EditContent } from "./about";

export const About = () => {
  const { about, updateAbout } = useAbout({ about: "" });
  const [edit, setEdit] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const editContent = (arg: boolean) => {
    setEdit(arg);
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
        {edit
          ? (
            <EditContent
              textareaRef={textareaRef}
              currentContent={about.about}
              editContent={editContent}
              newContent={updateAbout}
            />
          )
          : <Content content={about.about} editContent={editContent} />}
      </div>
    </div>
  );
};
