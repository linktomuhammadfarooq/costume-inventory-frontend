const BASE_URL = import.meta.env.VITE_API_BASE_URL; // replace with your actual API base URL

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }
  return response.json();
};

export const signUp = async (userData) => {
  const response = await fetch(`${BASE_URL}auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};

export const signIn = async (credentials) => {
  const response = await fetch(`${BASE_URL}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return handleResponse(response);
};

export const forgotPassword = async (email) => {
  const response = await fetch(`${BASE_URL}/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  return handleResponse(response);
};

export const refreshAccessToken = async (refreshToken) => {
  const response = await fetch(`${BASE_URL}auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + refreshToken,
    },
  });

  if (!response.ok) throw new Error("Token refresh failed");
  return response.json();
};

export const logout = async (accessToken, refreshToken) => {
  const response = await fetch(`${BASE_URL}auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) throw new Error("Logout failed");
  return response.json();
};
