import AsyncStorage from "@react-native-async-storage/async-storage";

export const initSetting = () => {
  const settings = {
    sound: true,
  };
  if (window) {
    AsyncStorage.setItem("@settings", JSON.stringify(settings));
    return settings;
  }
  return null;
};

export const getSetting = () => {
  let settings = AsyncStorage.getItem("settings");
  if (!settings) return initSetting();
  return JSON.parse(settings);
};

export const setSetting = (obj) => {
  if (typeof obj !== "object") return;

  AsyncStorage.setItem("settings", JSON.stringify(obj));
};
