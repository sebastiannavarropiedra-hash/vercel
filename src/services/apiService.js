const API_BASE_URL = "https://backendportfolio-8r5l.onrender.com/api";

// Test endpoint
export const testApi = async () => {
  const response = await fetch(`${API_BASE_URL}/test`);
  return response.json();
};

// Create a new user
export const crearUsuario = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};

// Get all users
export const getUsuarios = async () => {
  const response = await fetch(`${API_BASE_URL}/usuarios`);
  return response.json();
};

// Get user by ID
export const getUsuarioById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/usuarios/${id}`);
  return response.json();
};

// Update user
export const updateUsuario = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};

// Logical delete (mark as inactive)
export const deleteLogico = async (id) => {
  const response = await fetch(`${API_BASE_URL}/usuarios/logico/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

// Physical delete (remove from database)
export const deleteFisico = async (id) => {
  const response = await fetch(`${API_BASE_URL}/usuarios/fisico/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
