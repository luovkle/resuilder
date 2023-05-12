import { useEffect, useState } from "react";

import "../styles/Title.css";

const title = "Resuilder";

export const Title = () => {
  const [text, setText] = useState("");
  const [blinking, setBlinking] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setText(title.slice(0, text.length + 1));
    }, 75);
    return () => clearTimeout(timeout);
  }, [text]);

  useEffect(() => {
    if (text === title) {
      const timeout = setTimeout(() => {
        setBlinking(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [text]);

  return (
    <h1 className="text-2xl font-bold italic ">
      {blinking ? (
        <span className="blinking-cursor">{text}</span>
      ) : (
        <span>{text}</span>
      )}
    </h1>
  );
};
