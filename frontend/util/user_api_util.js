import { apiGet } from "./api";

export const fetchUser = (userId) => apiGet(`/api/users/${userId}`);
