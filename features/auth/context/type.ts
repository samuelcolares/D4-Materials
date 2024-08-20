import { TypeUser } from "@/types/index.type";
import { User } from "firebase/auth";

export type TypeAuthContext = {
  logOut: () => void;
  setProfile: (profile: TypeUser) => void;
  profile: TypeUser | null;
  userLoggedIn: boolean;
  loading: boolean;
};
