import axios from "axios";
export const BASE_API = `http://localhost:4000`;
export const USERS_API = `${BASE_API}/api/users`;
export const signin = async (credentials) => {
  const response = await axios.post( `${USERS_API}/signin`, credentials );
  return response.data;
};