import React, { useRef, useEffect, useState } from "react";

interface Props {
  showModal: (arg0: boolean) => void;
  url: string;
  setUrl: (arg0: string) => void;
  alt: string;
}

export const PictureModal = ({ showModal, url, setUrl, alt }: Props) => {
  const [newUrl, setNewUrl] = useState(url);

  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = ({ target }: MouseEvent) => {
    !cardRef.current?.contains(target) && showModal(false);
  };

  const handleKey = ({ key }: KeyboardEvent) => {
    key === "Escape" && showModal(false);
  };

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setNewUrl(value);
  };

  const handleKeyDown = ({ key }) => {
    key === "Enter" && setUrl(newUrl);
  };

  useEffect(() => {
    document.addEventListener("click", handleClick, true);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div>
      <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
        <div
          ref={cardRef}
          className="bg-gray-900 rounded-lg border border-gray-700 flex items-center"
        >
          <div className="space-y-4 mx-8 my-8">
            <div className="flex justify-center">
              <img src={url} alt={alt} className="rounded-full w-4/5" />
            </div>
            <div className="flex justify-center">
              <input
                type="text"
                value={newUrl}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Url"
                className="bg-blue-700 hover:bg-blue-600 px-4 py-1 w-4/5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
