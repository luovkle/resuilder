import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { ContactRead, ContactsService, OpenAPI } from "../client";

export const useContact = () => {
  const [contacts, setContacts] = useState<ContactRead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { getAccessTokenSilently } = useAuth0();

  const create = (title: string, url: string) => {
    setIsLoading(true);
    ContactsService.createCurrentContactProfilesMeContactsPost({ title, url })
      .then((newContact) =>
        setContacts((currentContacts) => [...currentContacts, newContact])
      )
      .catch(console.error);
    setIsLoading(false);
  };

  const read = async () => {
    setIsLoading(true);
    OpenAPI.TOKEN = await getAccessTokenSilently();
    ContactsService.readCurrentContactsProfilesMeContactsGet()
      .then(setContacts)
      .catch(console.error);
    setIsLoading(false);
  };

  useEffect(() => {
    read();
  }, []);

  return {
    contacts,
    create,
    isLoading,
  };
};
