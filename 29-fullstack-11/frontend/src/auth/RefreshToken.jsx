import axios from "../auth/AxiosConfig.jsx";
import { jwtDecode } from "jwt-decode";
import secureLocalStorage from "react-secure-storage";

const RefreshToken = async () => {
  const auth = secureLocalStorage.getItem("acessToken");
  const refresh = secureLocalStorage.getItem("refreshToken");

  if (!auth || !refresh) {
    return false;
  }

  const exp = new Date(jwtDecode(auth).exp * 1000);

  console.log("jalam sebelum kondisi refresh ...");
  if (exp <= new Date()) {
    console.log("jalam sesudah kondisi refresh ...");
    try {
      const response = await axios.get("/api/users/refresh", {
        headers: {
          Authorization: `Bearer ${secureLocalStorage.getItem("refreshToken")}`,
        },
      });

      if (!response.data) {
        return false;
      }

      secureLocalStorage.setItem("acessToken", response.data.acessToken);
      secureLocalStorage.setItem("refreshToken", response.data.refreshToken);
      secureLocalStorage.setItem("user", response.data.data);

      return true;
    } catch (error) {
      return false;
    }
  }
};

export default RefreshToken;
