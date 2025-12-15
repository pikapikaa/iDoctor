import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

const authKey = "auth-key";

type AuthState = {
  isLoggedIn: boolean;
  logIn: (name: User) => void;
  logOut: () => void;
  isReady: boolean;
  user: User | null;
};

export type User = {
  id: number;
  name: string;
  role: "doctor" | "patient";
};

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  isReady: false,
  logIn: () => {},
  logOut: () => {},
  user: null,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const persistState = async (newState: {
    isLoggedIn: boolean;
    userData: User | null;
  }) => {
    try {
      const result = JSON.stringify(newState);
      await AsyncStorage.setItem(authKey, result);
    } catch (error) {
      console.log("store error: ", error);
    }
  };

  const logIn = (username: User) => {
    if (!username) return;

    setIsLoggedIn(true);
    setUser(username);
    persistState({ isLoggedIn: true, userData: username });
    router.replace("/");
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setUser(null);
    persistState({ isLoggedIn: false, userData: null });
    router.replace("/login");
  };

  useEffect(() => {
    const getAuthData = async () => {
      try {
        const value = await AsyncStorage.getItem(authKey);
        if (value !== null) {
          const auth = JSON.parse(value);
          setIsLoggedIn(auth.isLoggedIn);
          setUser(auth.login);
        }
      } catch (error) {
        console.log("store get error: ", error);
      }
      setIsReady(true);
    };
    getAuthData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        logIn,
        logOut,
        isReady,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
