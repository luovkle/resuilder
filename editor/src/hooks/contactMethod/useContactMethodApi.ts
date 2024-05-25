import type {
  ContactMethodCreate,
  ContactMethodUpdate,
} from "../../services/api";
import { ContactMethodsApi } from "../../services/api";
import useApi from "../useApi";

const useContactMethodApi = () => {
  const contactMethodApi = useApi(ContactMethodsApi);

  const createContactMethod = async (data: ContactMethodCreate) => {
    if (!contactMethodApi) {
      return Promise.reject("contactMethodApi is undefined");
    }
    const response =
      await contactMethodApi.createContactMethodCurrentUserContactMethodsMePost(
        data,
      );
    return response.data;
  };

  const readContactMethods = async () => {
    if (!contactMethodApi) {
      return Promise.reject("contactMethodApi is undefined");
    }
    const response =
      await contactMethodApi.readContactMethodsCurrentUserContactMethodsMeGet();
    return response.data;
  };

  const updateContactMethod = async (id: string, data: ContactMethodUpdate) => {
    if (!contactMethodApi) {
      return Promise.reject("contactMethodApi is undefined");
    }
    const response =
      await contactMethodApi.updateContactMethodCurrentUserContactMethodsMeIdPatch(
        id,
        data,
      );
    return response.data;
  };

  const deleteContactMethod = async (id: string) => {
    if (!contactMethodApi) {
      return Promise.reject("contactMethodApi is undefined");
    }
    const response =
      await contactMethodApi.deleteContactMethodCurrentUserContactMethodsMeIdDelete(
        id,
      );
    return response.data;
  };

  return {
    createContactMethod,
    readContactMethods,
    updateContactMethod,
    deleteContactMethod,
  };
};

export default useContactMethodApi;
