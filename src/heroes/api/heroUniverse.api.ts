import axios from "axios";

export const HERO_API_BASE_URL = import.meta.env["VITE_API_URL"];

const heroUniverseApi = axios.create({
  baseURL: `${HERO_API_BASE_URL}/api/heroes`,
});

export default heroUniverseApi;
