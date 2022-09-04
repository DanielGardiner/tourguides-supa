import { useMutation } from "react-query";
import { supabase } from "../client";

const login = async ({ email }) => {
  const { data, error } = await supabase.auth.signIn({
    email,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default function useLogin({
  email,
  onMutate: customOnMutate = () => {},
  onError: customOnError = () => {},
  onSuccess: customOnSuccess = () => {},
  onSettled: customOnSettled = () => {},
}) {
  // Could use this format instead, just aesthetics
  // return useMutation(() => login({ email }), {
  //   onMutate: () => {
  //     customOnMutate();
  //   },
  //   onError: () => {
  //     customOnError();
  //   },
  //   onSuccess: () => {
  //     customOnSuccess();
  //   },
  //   onSettled: () => {
  //     customOnSettled();
  //   },
  // });
  return useMutation(() => login({ email }), {
    onMutate: customOnMutate,
    onSuccess: customOnSuccess,
    onError: customOnError,
    onSettled: customOnSettled,
  });
}
