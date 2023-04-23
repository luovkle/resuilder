import { KeyboardEvent, useEffect, useRef, useState } from "react";

import { useContact } from "../hooks";

interface NewMethod {
  title: string;
  url: string;
}

const methodInitialData = {
  title: "",
  url: "",
};

export const Contact = () => {
  const { contacts: methods, create } = useContact();

  const [addNewMethod, setAddNewMethod] = useState(false);
  const [newMethod, setNewMethod] = useState<NewMethod>(methodInitialData);

  const methodTitleInputRef = useRef<HTMLInputElement>(null);
  const methodUrlInputRef = useRef<HTMLInputElement>(null);

  const addMethod = ({ title, url }: NewMethod) => {
    create(title, url);
    setNewMethod(methodInitialData);
  };

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setNewMethod({ ...newMethod, [name]: value });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (
        newMethod.title.trim().length > 0 &&
        newMethod.url.trim().length > 0
      ) {
        addMethod(newMethod);
        methodTitleInputRef.current?.focus();
      } else if (newMethod.title.trim().length > 0) {
        methodUrlInputRef.current?.focus();
      } else if (newMethod.url.trim().length > 0) {
        methodTitleInputRef.current?.focus();
      }
    } else if (event.key === "Escape") {
      setNewMethod(methodInitialData);
      setAddNewMethod(false);
    }
  };

  const handleAddMethod = () => setAddNewMethod(true);

  useEffect(() => {
    if (addNewMethod) methodTitleInputRef.current?.focus();
  }, [addNewMethod]);

  return (
    <div className="py-5 space-y-5">
      <div>
        <h5 className="text-sm font-medium text-gray-400">Contact</h5>
      </div>
      <div className="flex flex-wrap gap-2">
        {methods.map((method) => (
          <a
            key={method._id}
            href={method.url}
            target="”_blank”"
            className="bg-gray-700 px-4 py-1"
          >
            {method.title}
          </a>
        ))}
        {addNewMethod
          ? (
            <>
              <input
                ref={methodTitleInputRef}
                type="text"
                className="bg-blue-700 hover:bg-blue-600 px-4 py-1"
                name={"title"}
                value={newMethod.title}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Title"
              />
              <input
                ref={methodUrlInputRef}
                type="text"
                className="bg-blue-700 hover:bg-blue-600 px-4 py-1"
                name={"url"}
                value={newMethod.url}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Url"
              />
            </>
          )
          : (
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-500 px-4 py-1"
              onClick={handleAddMethod}
            >
              +
            </button>
          )}
      </div>
    </div>
  );
};
