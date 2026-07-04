import { apiPost, apiDelete } from "./api";

export const login = (user) => apiPost("/api/session", { user });

export const signup = (user) => apiPost("/api/users", { user });

export const logout = () => apiDelete("/api/session");
