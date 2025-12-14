import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = {
  async set<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("AsyncStorage set error", e);
    }
  },

  async get<T>(key: string, defaultValue: T): Promise<T> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? (JSON.parse(value) as T) : defaultValue;
    } catch (e) {
      console.error("AsyncStorage get error", e);
      return defaultValue;
    }
  },

  async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  },

  async clear(): Promise<void> {
    await AsyncStorage.clear();
  },
};
