import type {
  ContactMethodCreate,
  ContactMethodUpdate,
} from "../../services/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useContactMethodApi from "./useContactMethodApi";

const useContactMethod = () => {
  const queryClient = useQueryClient();
  const {
    createContactMethod,
    readContactMethods,
    updateContactMethod,
    deleteContactMethod,
  } = useContactMethodApi();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["contactMethod"],
    queryFn: readContactMethods,
  });

  const createContactMethodMutation = useMutation({
    mutationFn: createContactMethod,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["contactMethod"] }),
  });

  const updateContactMethodMutation = useMutation({
    mutationFn: updateContactMethod,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["contactMethod"] }),
  });

  const deleteContactMethodMutation = useMutation({
    mutationFn: deleteContactMethod,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["contactMethod"] }),
  });

  return {
    contactMethods: data,
    isLoading,
    isError,
    error,
    createContactMethod: (data: ContactMethodCreate) =>
      createContactMethodMutation.mutate(data),
    updateContactMethod: (data: { id: string; data: ContactMethodUpdate }) => {
      updateContactMethodMutation.mutate(data);
    },
    deleteContactMethod: (id: string) => {
      deleteContactMethodMutation.mutate(id);
    },
  };
};

export default useContactMethod;
