import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

const authKey = "auth-key";

export type Role = "doctor" | "patient";

type AuthState = {
  isLoggedIn: boolean;
  logIn: (name: string) => void;
  logOut: () => void;
  isReady: boolean;
  login: string;
};

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  isReady: false,
  logIn: () => {},
  logOut: () => {},
  login: "",
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [login, setLogin] = useState("");
  const router = useRouter();

  const persistState = async (newState: {
    isLoggedIn: boolean;
    login: string;
  }) => {
    try {
      const result = JSON.stringify(newState);
      await AsyncStorage.setItem(authKey, result);
    } catch (error) {
      console.log("store error: ", error);
    }
  };

  const logIn = (username: string) => {
    if (!username) return;

    setIsLoggedIn(true);
    setLogin(username);
    persistState({ isLoggedIn: true, login: username });
    router.replace("/");
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setLogin("");
    persistState({ isLoggedIn: false, login: "" });
    router.replace("/login");
  };

  useEffect(() => {
    const getAuthData = async () => {
      try {
        const value = await AsyncStorage.getItem(authKey);
        if (value !== null) {
          const auth = JSON.parse(value);
          setIsLoggedIn(auth.isLoggedIn);
          setLogin(auth.login);
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
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
