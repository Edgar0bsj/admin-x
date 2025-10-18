import api from "./api";

export default async function checkToken() {
  try {
    const response = await api.get("/auth/login");
  } catch (error) {}
}
