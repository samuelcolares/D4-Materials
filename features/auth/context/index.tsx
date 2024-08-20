import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { TypeAuthContext } from "./type";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { TypeUser } from "@/types/index.type";
import { useRouter } from "next/navigation";
import useProtectedRoute from "../hooks/use-protected-routes";
import getUser from "@/features/User/queries/get-user";

const AuthContext = createContext<TypeAuthContext>({} as TypeAuthContext);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<TypeUser | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setFirebaseUser(null);
        setUserLoggedIn(false);
      })
      .finally(() => {
        router.push("/");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  const initializeUser = async (user: User | null) => {
    try {
      if (!user) throw Error("No user");
      const possibleProfile = await getUser(user.uid);
      if (possibleProfile) setProfile(possibleProfile);

      setFirebaseUser(user);
      setUserLoggedIn(true);
    } catch (error) {
      setFirebaseUser(null);
      setProfile(null);
      setUserLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useProtectedRoute(firebaseUser, userLoggedIn, profile);

  return (
    <AuthContext.Provider
      value={{
        profile,
        setProfile,
        userLoggedIn,
        loading,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
