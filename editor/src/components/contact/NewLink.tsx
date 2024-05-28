import type { ContactMethodCreate } from "../../services/api";
import { useEffect, useRef, useState } from "react";

interface Props {
  handleCreateLink: (data: ContactMethodCreate) => void;
}

const NewLink = ({ handleCreateLink }: Props) => {
  const [editing, setEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
  const [previousTitle, setPreviousTitle] = useState("");
  const linkRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const [currentUrl, setCurrentUrl] = useState("");
  const [previousUrl, setPreviousUrl] = useState("");

  const handleEditing = () => {
    setPreviousTitle(currentTitle);
    setPreviousUrl(currentUrl);
    setEditing(true);
  };

  const handleTitleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(target.value);
  };

  const handleUrlChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentUrl(target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Validate minimum field length
      if (currentTitle.length === 0) {
        setCurrentTitle(previousTitle);
      }
      if (currentUrl.length === 0) {
        setCurrentUrl(previousUrl);
      }
      // Create link
      if (
        currentTitle.length >= 1 &&
        currentTitle !== previousTitle &&
        currentUrl.length >= 1 &&
        currentUrl !== previousUrl
      ) {
        handleCreateLink({
          title: currentTitle,
          url: currentUrl,
        });
      }
      // Focus url
      else if (currentTitle.length >= 1 && currentTitle !== previousTitle) {
        urlRef.current?.focus();
        return;
      }
      // Focus title
      else if (currentUrl.length >= 1 && currentUrl !== previousUrl) {
        titleRef.current?.focus();
        return;
      }
      setCurrentTitle("");
      setCurrentUrl("");
      setPreviousTitle("");
      setPreviousUrl("");
      setEditing(false);
    } else if (e.key === "Escape") {
      setCurrentTitle(previousTitle);
      setEditing(false);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (linkRef.current && !linkRef.current.contains(e.target as Node)) {
      setCurrentTitle(previousTitle);
      setCurrentUrl(previousUrl);
      setEditing(false);
    }
  };

  useEffect(() => {
    if (editing) {
      document.addEventListener("mousedown", handleClickOutside);
      titleRef.current?.focus();
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
        <div
          ref={linkRef}
          className="bg-blue-500 px-4 py-1 rounded-md space-x-2"
        >
          <input
            ref={titleRef}
            type="text"
            value={currentTitle}
            onChange={handleTitleChange}
            onKeyDown={handleKeyDown}
            placeholder="Example"
            className="bg-transparent outline-none placeholder-gray-200"
          />
          <input
            ref={urlRef}
            type="text"
            value={currentUrl}
            onChange={handleUrlChange}
            onKeyDown={handleKeyDown}
            placeholder="https://example.com"
            className="bg-transparent outline-none placeholder-gray-200"
          />
        </div>
      ) : (
        <div className="bg-blue-600 hover:bg-blue-500 px-4 py-1 rounded-md space-x-2">
          <button type="button" onClick={handleEditing}>
            ✨
          </button>
        </div>
      )}
    </>
  );
};

export default NewLink;
