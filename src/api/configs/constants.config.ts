import { environment } from "../../environments/environment";

const BASE_URL = environment.apiUrl;
const BASE_API_URL = BASE_URL + "/api";
const SECURE_BASE_API_URL = BASE_API_URL + "/secured";
const COMMON_BASE_API_URL = BASE_API_URL + "/common";

export const API_CONSTANTS = {
  BASE_URL: BASE_URL,
  BASE_API_URL: BASE_API_URL,
  SECURE_BASE_URL: SECURE_BASE_API_URL,
  COMMON_BASE_API_URL: COMMON_BASE_API_URL,
};
