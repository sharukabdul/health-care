// src/utils/auth.js
export const getAuthUser = () => {
  try {
    const data = localStorage.getItem("auth:user");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const setAuthUser = (user) => {
  localStorage.setItem("auth:user", JSON.stringify(user));
};

export const clearAuth = () => {
  localStorage.removeItem("auth:user");
};

export const isLoggedIn = () => !!getAuthUser();
