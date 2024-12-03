import axios from "axios";
import { apiCall, authApiCall, apiUrl } from "../../../utils/apiUtils";
import { getUniqueIdentifier } from "../../../utils/cryptoUtils";
import { User } from "../../../models/User";

export const registerUser = async (credentials: {
  email: string;
  password: string;
  username: string;
  name: string;
}): Promise<{ message: string; statusCode: number }> => {
  return authApiCall<void>("auth/register", "POST", credentials);
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<{
  id: string;
  message: string;
  statusCode: number;
  refreshToken: string;
  accessToken: string;
}> => {
  const uniqueId = getUniqueIdentifier();
  // console.log("Generated uniqueId for login:", uniqueId);

  try {
    // Make the login API call and pass the uniqueId
    const response = await authApiCall<{
      id: string;
      accessToken: string;
      refreshToken: string;
    }>("auth/login", "POST", {
      ...credentials,
      uniqueId,
    });

    // console.log("Login API response:", response);

    return {
      id: response.id,
      message: response.message,
      statusCode: response.statusCode,
      refreshToken: response.refreshToken,
      accessToken: response.accessToken,
    };
  } catch (error) {
    console.error("Error during login API call:", error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  // First check sessionStorage, then fallback to localStorage
  const localAuthState =
    JSON.parse(sessionStorage.getItem("auth")!) ||
    JSON.parse(localStorage.getItem("authState")!);
  if (!localAuthState) {
    return console.error("No auth state found for logout.");
  }

  const refreshToken = localAuthState.refreshToken;

  const uniqueId = getUniqueIdentifier();

  if (!refreshToken) {
    throw new Error("No refresh token found for logout.");
  }

  try {
    await axios.post(
      `${apiUrl}/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          "bypass-tunnel-reminder": "true",
          "Content-Type": "application/json",
          uniqueId: uniqueId,
        },
      }
    );
  } catch (error) {
    console.error("Error during logout:", error);
    throw new Error("Logout failed");
  }
};

export const getUserById = async (id: string): Promise<User> => {
    return apiCall<User>(`auth/${id}`, "GET");
  };
