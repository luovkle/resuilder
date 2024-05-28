import type { ContactMethodUpdate } from "../../services/api";
import { useEffect, useRef, useState } from "react";

interface Props {
  id: string;
  title: string;
  url: string;
  handleUpdateLink: (id: string, data: ContactMethodUpdate) => void;
  handleDeleteLink: (id: string) => void;
}

const Link = ({
  id,
  title,
  url,
  handleUpdateLink,
  handleDeleteLink,
}: Props) => {
  const [editing, setEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [previousTitle, setPreviousTitle] = useState(title);
  const linkRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const [currentUrl, setCurrentUrl] = useState(url);
  const [previousUrl, setPreviousUrl] = useState(url);

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
      // Title and url updated
      if (
        currentTitle.length >= 1 &&
        currentTitle !== previousTitle &&
        currentUrl.length >= 1 &&
        currentUrl !== previousUrl
      ) {
        handleUpdateLink(id, {
          title: currentTitle,
          url: currentUrl,
        });
      }
      // Only the title is updated
      else if (currentTitle.length >= 1 && currentTitle !== previousTitle) {
        handleUpdateLink(id, {
          title: currentTitle,
        });
      }
      // Only the url is updated
      else if (currentUrl.length >= 1 && currentUrl !== previousUrl) {
        handleUpdateLink(id, {
          url: currentUrl,
        });
      }
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

  const handleDelete = () => {
    handleDeleteLink(id);
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
            className="bg-transparent outline-none"
          />
          <input
            type="text"
            value={currentUrl}
            onChange={handleUrlChange}
            onKeyDown={handleKeyDown}
            className="bg-transparent outline-none"
          />
        </div>
      ) : (
        <div className="bg-blue-600 hover:bg-blue-500 px-4 py-1 rounded-md space-x-2">
          <span onClick={handleEditing}>{currentTitle}</span>
          <button type="button" onClick={handleDelete}>
            🔥
          </button>
        </div>
      )}
    </>
  );
};

export default Link;
