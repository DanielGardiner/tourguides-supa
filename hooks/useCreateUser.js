import { useMutation } from "react-query";
import { supabase } from "../client";

const createUser = async ({ email, password }) => {
  const { user, error } = await supabase.auth.signUp({
    email,
    password: "dnewdnwjd2@FEWf", // For dev purposes
  });

  if (error) {
    throw new Error(error.message);
  }

  return user;
};

// TODO: probably better to do all this in a postgres trigger, but this is for experimenting with onSuccess
async function createUserProfile({ id, email }) {
const { data, error } = await supabase
  .from("profile")
  .insert([{ user_id: id, role: "member" }]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}


export default function useCreateUser({
  email,
  password,
  onMutate: customOnMutate = () => {},
  onError: customOnError = () => {},
  onSuccess: customOnSuccess = () => {},
  onSettled: customOnSettled = () => {},
}) {
  return useMutation(() => createUser({ email, password }), {
    onMutate: customOnMutate,
    onError: customOnError,
    onSuccess: (data, variables, context) => {
      const { id, email } = data;
      createUserProfile({ id, email })
      customOnSuccess();
    },
    onSettled: customOnSettled,
  });
}
