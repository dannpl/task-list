import api from "./api";

export default class Repository {
  getUsers = async () => api.get(`/users`);

  createUser = async (data) => api.post(`/users`, data);

  deleteUser = async (id) => api.deete(`/users/${id}`);
}
