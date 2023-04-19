import { useRef, useEffect } from "react";

import { SelectPicture } from "./picture/SelectPicture";

interface Props {
  showModal: (arg0: boolean) => void;
  url: string;
  alt: string;
  newPicture: (picture: File) => void;
}

export const PictureModal = ({ showModal, url, alt, newPicture }: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = ({ target }: MouseEvent) => {
    !cardRef.current?.contains(target as Node) && showModal(false);
  };

  const handleKey = ({ key }: KeyboardEvent) => {
    key === "Escape" && showModal(false);
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
              <SelectPicture newPicture={newPicture} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
