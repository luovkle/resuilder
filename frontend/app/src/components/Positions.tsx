import { useState } from "react";
import { PositionRead } from "../client";

import { usePositions } from "../hooks";
// import { Picture } from "./Picture";
import { PositionModal } from "./PositionModal";

const positionInitialData = {
  _id: "",
  picture: "",
  title: "",
  company: "",
  start_date: "",
  end_date: "",
  details: "",
};

export const Positions = () => {
  const { positions, createPosition, updatePosition } = usePositions();
  const [showModal, setShowModal] = useState(false);
  const [positionData, setPositionData] =
    useState<PositionRead>(positionInitialData);

  const handleClick = (position: PositionRead) => {
    setShowModal(true);
    setPositionData(position);
  };

  const handleAddPosition = () => {
    setShowModal(true);
    setPositionData(positionInitialData);
  };

  return (
    <div>
      <div className="py-5 space-y-5">
        <div>
          <h5 className="text-sm font-medium text-gray-400">Positions</h5>
        </div>
        <div className="space-y-5">
          {positions.map((position) => (
            <div key={position._id} className="grid grid-cols-12 gap-4">
              <div className="col-span-1">
                {position.picture_url ? (
                  <div>
                    {/*
                    <Picture
                      picture_url={position.picture_url}
                      alt={position.title}
                      newPicture={updatePositionPicture}
                    />
                  */}
                  </div>
                ) : (
                  <div className="flex items-center justify-center bg-blue-600 w-[43.8333px] h-[43.8333px] rounded-full font-bold select-none">
                    {position.title[0]?.toUpperCase()}
                  </div>
                )}
              </div>
              <div
                className="col-span-11 space-y-5"
                onClick={() => handleClick(position)}
              >
                <div>
                  <h3 className="text-lg font-semibold">{position.title}</h3>
                  <p className="text-gray-400 text-sm">
                    <span>{position.company}</span> •{" "}
                    <span>
                      {position.start_date} - {position.end_date}
                    </span>
                  </p>
                </div>
                <p className="text-gray-400">{position.details}</p>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-500 px-4 py-1 w-full"
            onClick={handleAddPosition}
          >
            +
          </button>
        </div>
      </div>
      {showModal && (
        <PositionModal
          showModal={setShowModal}
          positionData={positionData}
          addPosition={createPosition}
          editPosition={updatePosition}
        />
      )}
    </div>
  );
};
