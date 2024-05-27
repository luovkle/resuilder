import { useContactMethod } from "../../hooks";
import Skeleton from "./Skeleton";

const Contact = () => {
  const { contactMethods, isLoading } = useContactMethod();

  return (
    <div className="py-5 space-y-5">
      <div>
        <h5 className="text-sm font-medium text-gray-400 select-none">
          Contact
        </h5>
      </div>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="flex flex-wrap gap-2">
          {contactMethods?.map((contactMethod) => (
            <a
              key={contactMethod.id}
              href={contactMethod.url}
              target="”_blank”"
              className="bg-blue-600 hover:bg-blue-500 px-4 py-1 rounded-md"
            >
              {contactMethod.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Contact;
