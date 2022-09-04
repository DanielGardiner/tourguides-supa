import { useMutation } from "react-query";
import { supabase } from "../client";

const createUser = async ({ email }) => {
  const res = await supabase.auth.signIn({
    email,
  });

  console.log('%c [qq]: res ', 'background: #fbff00; color: #000000; font-size: 1rem; padding: 0.2rem 0; margin: 0.5rem;', '\n', res, '\n\n');

  // if (error) {
  //   throw new Error(error.message);
  // }
  // console.log('%c [qq]: -- data ', 'background: #fbff00; color: #000000; font-size: 1rem; padding: 0.2rem 0; margin: 0.5rem;', '\n', data, '\n\n');

  // return data;
};

async function createUserProfile({ email }) {
  const { data, error } = await supabase.auth.signIn({
    email,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// const { data, error } = await supabase
//   .from("profile")
//   .insert([{ some_column: "someValue", other_column: "otherValue" }]);
export default function useCreateUser({
  email,
  onMutate: customOnMutate = () => {},
  onError: customOnError = () => {},
  onSuccess: customOnSuccess = () => {},
  onSettled: customOnSettled = () => {},
}) {
  return useMutation(() => createUser({ email }), {
    onMutate: customOnMutate,
    onError: customOnError,
    onSuccess: (data, variables, context) => {
      console.log('%c [qq]: data ', 'background: #fbff00; color: #000000; font-size: 1rem; padding: 0.2rem 0; margin: 0.5rem;', '\n', data, '\n\n');
      console.log('%c [qq]: variables ', 'background: #fbff00; color: #000000; font-size: 1rem; padding: 0.2rem 0; margin: 0.5rem;', '\n', variables, '\n\n');
      console.log('%c [qq]: context ', 'background: #fbff00; color: #000000; font-size: 1rem; padding: 0.2rem 0; margin: 0.5rem;', '\n', context, '\n\n');
      // createUserProfile({ email })
      customOnSuccess();
    },
    onSettled: customOnSettled,
  });
}
