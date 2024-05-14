import { useState } from "react";

const Contact = () => {
  const [contactMethods, setContactMethods] = useState([
    {
      title: "localhost",
      url: "http://localhost",
    },
  ]);

  return (
    <div className="py-5 space-y-5">
      <div>
        <h5 className="text-sm font-medium text-gray-400 select-none">
          Contact
        </h5>
      </div>
      <div className="flex flex-wrap gap-2">
        {contactMethods.map((contactMethod) => (
          <a
            href={contactMethod.url}
            target="”_blank”"
            className="bg-gray-700 px-4 py-1"
          >
            {contactMethod.title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Contact;
