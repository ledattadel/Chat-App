import AsyncStorage from "@react-native-async-storage/async-storage";

export const isAuthenticated = async () => {
  let data = await AsyncStorage.getItem("@asauth");
  if (data) {
    let token = JSON.parse(data).token.accessToken;
    if (token) return token;
  }
  return false;
};
