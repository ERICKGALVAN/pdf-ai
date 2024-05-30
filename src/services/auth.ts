import api from "../utils/api";

async function login(username: string, password: string) {
  const response = await api.post("/user/login", { username, password });
  return response;
}

async function createAccount(username: string, password: string) {
  const response = await api.post("/user/", { username, password });
  return response;
}

const authService = {
  login,
  createAccount,
};

export default authService;
