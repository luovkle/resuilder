import React, { useEffect, useRef, useState } from "react";

import { PositionRead } from "../client";

interface Props {
  showModal: (arg0: boolean) => void;
  positionData: PositionRead;
  addPosition: (position: PositionRead) => void;
  editPosition: (arg0: string, arg1: PositionRead) => void;
}

export const PositionModal = ({
  showModal,
  positionData,
  addPosition,
  editPosition,
}: Props) => {
  const [position, setPosition] = useState<PositionRead>(positionData);
  const cardRef = useRef<HTMLDivElement>(null);

  const titleRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const detailsRef = useRef<HTMLTextAreaElement>(null);

  const handleConfirm = () => {
    position._id ? editPosition(position._id, position) : addPosition(position);
    showModal(false);
  };

  const handleClick = ({ target }: MouseEvent) => {
    !cardRef.current?.contains(target as Node) && showModal(false);
  };

  const handleKey = ({ key }: KeyboardEvent) => {
    key === "Escape" && showModal(false);
  };

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPosition({ ...position, [name]: value });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    // disable when shift is pressed
    if (event.key === "Enter") {
      if (position.title.trim().length < 1) titleRef.current?.focus();
      else if (position.company.trim().length < 1) companyRef.current?.focus();
      else if (position.start_date.trim().length < 1) {
        startDateRef.current?.focus();
      } else if (position.end_date.trim().length < 1) {
        endDateRef.current?.focus();
      } else if (position.details.trim().length < 1) {
        event.preventDefault();
        detailsRef.current?.focus();
      } else handleConfirm();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div>
      <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
        <div
          ref={cardRef}
          className="bg-gray-900 w-4/5 rounded-lg border border-gray-700 flex items-center"
        >
          <div className="space-y-4 mx-8 my-8">
            <div className="grid grid-cols-12 gap-4" onKeyDown={handleKeyDown}>
              <div className="col-span-1">
                {position.picture_url && position.picture_url.length > 0
                  ? (
                    <img
                      src={position.picture_url}
                      alt={position.title}
                      className="rounded-full"
                    />
                  )
                  : (
                    <div className="flex items-center justify-center bg-blue-600 w-[43.8333px] h-[43.8333px] rounded-full font-bold select-none">
                      {position.title[0]?.toUpperCase()}
                    </div>
                  )}
              </div>
              <div className="col-span-11 space-y-2">
                <div>
                  <input
                    ref={titleRef}
                    type="text"
                    name="title"
                    value={position.title}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className="text-lg font-semibold bg-gray-800 hover:bg-gray-700 px-4 py-1 mb-2 rounded-md border border-gray-700 w-full"
                    placeholder="Title"
                  />
                  <input
                    ref={companyRef}
                    type="text"
                    name="company"
                    value={position.company}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className="bg-gray-800 hover:bg-gray-700 px-4 py-1 rounded-md border border-gray-700 w-full"
                    placeholder="Company"
                  />
                  <div className="flex gap-2 mt-2">
                    <input
                      ref={startDateRef}
                      type="text"
                      name="start_date"
                      value={position.start_date}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      className="bg-gray-800 hover:bg-gray-700 px-4 py-1 rounded-md border border-gray-700 w-3/6"
                      placeholder="Start date"
                    />
                    <input
                      ref={endDateRef}
                      type="text"
                      name="end_date"
                      value={position.end_date}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      className="bg-gray-800 hover:bg-gray-700 px-4 py-1 rounded-md border border-gray-700 w-3/6"
                      placeholder="End date"
                    />
                  </div>
                </div>
                <textarea
                  ref={detailsRef}
                  rows={4}
                  name="details"
                  value={position.details}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  className="bg-gray-800 hover:bg-gray-700 px-4 py-1 w-full rounded-md border border-gray-700 resize-none"
                  placeholder="Details"
                >
                </textarea>
                <button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-500 px-4 py-1 w-full rounded-md"
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
