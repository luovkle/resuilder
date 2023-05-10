import { useEffect, useRef, useState } from "react";

import { useAbout } from "../hooks";
import { Content, EditContent } from "./about";
import { Section } from "./";

export const About = () => {
  const { about, updateAbout } = useAbout({ about: "" });
  const [edit, setEdit] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const editContent = (arg: boolean) => {
    setEdit(arg);
  };

  useEffect(() => {
    if (edit) {
      if (about.about) {
        const end = about.about.length;
        textareaRef.current?.setSelectionRange(end, end);
      }
      textareaRef.current?.focus();
    }
  }, [edit]);

  return (
    <Section name="About">
      <div>
        {edit ? (
          <EditContent
            textareaRef={textareaRef}
            currentContent={about.about}
            editContent={editContent}
            newContent={updateAbout}
          />
        ) : (
          <Content content={about.about} editContent={editContent} />
        )}
      </div>
    </Section>
  );
};
