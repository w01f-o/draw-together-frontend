import { useAppDispatch, useAppSelector } from "@/libs/hooks/redux";
import { setNameAction } from "@/libs/scopes/user/slice/slice";

export type useUserReturn = {
  user: {
    name: string;
    id: string;
  };
  setName: (name: string) => void;
};

export const useUser = (): useUserReturn => {
  const dispatch = useAppDispatch();
  const { name, id } = useAppSelector((state) => state.user);

  const setName = (name: string) => dispatch(setNameAction(name));

  return {
    user: {
      name,
      id,
    },
    setName,
  };
};
