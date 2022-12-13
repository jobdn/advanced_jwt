import { useAppSelector } from "hooks";

export const useAuth = () => {
  const { user } = useAppSelector((state) => state.user);

  return {
    isAuth: !!user.email || !!user.name,
    user,
  };
};
