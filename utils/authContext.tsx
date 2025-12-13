import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

const authKey = "auth-key";

type AuthState = {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
  isReady: boolean;
};

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  isReady: false,
  logIn: () => {},
  logOut: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  const persistState = async (newState: { isLoggedIn: boolean }) => {
    try {
      const result = JSON.stringify(newState);
      await AsyncStorage.setItem(authKey, result);
    } catch (error) {
      console.log("store error: ", error);
    }
  };

  const logIn = () => {
    setIsLoggedIn(true);
    persistState({ isLoggedIn: true });
    router.replace("/");
  };

  const logOut = () => {
    setIsLoggedIn(false);
    persistState({ isLoggedIn: false });
    router.replace("/login");
  };

  useEffect(() => {
    const getAuthData = async () => {
      try {
        const value = await AsyncStorage.getItem(authKey);
        if (value !== null) {
          const auth = JSON.parse(value);
          setIsLoggedIn(auth.isLoggedIn);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
