import type {
  ContactMethodCreate,
  ContactMethodUpdate,
} from "../../services/api";
import { useContactMethod } from "../../hooks";
import Skeleton from "./Skeleton";
import Link from "./Link";
import NewLink from "./NewLink";

const Contact = () => {
  const {
    contactMethods,
    isLoading,
    createContactMethod,
    updateContactMethod,
    deleteContactMethod,
  } = useContactMethod();

  const handleCreateLink = (data: ContactMethodCreate) => {
    createContactMethod(data);
  };

  const handleUpdateLink = (id: string, data: ContactMethodUpdate) => {
    updateContactMethod({ id, data });
  };

  const handleDeleteLink = (id: string) => {
    deleteContactMethod(id);
  };

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
            <Link
              key={contactMethod.id}
              id={contactMethod.id}
              title={contactMethod.title}
              url={contactMethod.url}
              handleUpdateLink={handleUpdateLink}
              handleDeleteLink={handleDeleteLink}
            />
          ))}
          <NewLink handleCreateLink={handleCreateLink} />
        </div>
      )}
    </div>
  );
};

export default Contact;
