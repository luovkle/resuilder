import { ReactNode } from "react";

export const Section = ({
  name,
  onMenu,
  children,
}: {
  name: string;
  onMenu?: () => void;
  children: ReactNode;
}) => {
  return (
    <div className="py-5 space-y-5">
      <div className="flex justify-between">
        <h5 className="text-sm font-medium text-gray-400">{name}</h5>
        {onMenu && (
          <button
            type="button"
            className="fill-gray-400 hover:fill-gray-200"
            onClick={onMenu}
          >
            <svg
              width="20px"
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
            </svg>{" "}
          </button>
        )}
      </div>
      {children}
    </div>
  );
};
