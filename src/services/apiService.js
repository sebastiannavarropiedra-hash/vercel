/**
 * API Service Module
 * 
 * This module centralizes all API calls to the backend.
 * All fetch requests go through these functions to avoid code duplication.
 * Base URL is configured once here, making it easy to change if needed.
 * 
 * Benefits:
 * - Single source of truth for API endpoints
 * - Easy maintenance and updates
 * - Consistent error handling
 * - Reusable across all components
 */

const API_BASE_URL = "https://backendportfolio-8r5l.onrender.com/api";

/**
 * Test the API connection
 * Endpoint: GET /test
 * Used to verify the backend is running and accessible
 */
export const testApi = async () => {
  const response = await fetch(`${API_BASE_URL}/test`);
  return response.json();
};

/**
 * Create a new user
 * Endpoint: POST /api/usuarios
 * Expected body: { Nombre_Usuario, Credencial_Espacial, ID_Perfil }
 * Returns: Response with created user data
 */
export const crearUsuario = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};

/**
 * Fetch all users from the database
 * Endpoint: GET /api/usuarios
 * Returns: Array of users with their data
 */
export const getUsuarios = async () => {
  const response = await fetch(`${API_BASE_URL}/usuarios`);
  return response.json();
};

/**
 * Fetch a single user by their ID
 * Endpoint: GET /api/usuarios/:id
 * Params: id - User ID to search for
 * Returns: User object wrapped in datos array
 */
export const getUsuarioById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/usuarios/${id}`);
  return response.json();
};

/**
 * Update an existing user
 * Endpoint: PUT /api/update
 * Expected body: { ID_Usuario, Nombre_Usuario, Credencial_Espacial, ID_Perfil }
 * Returns: Response with update status
 */
export const updateUsuario = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};

/**
 * Logical delete - Mark user as inactive (soft delete)
 * Endpoint: DELETE /api/usuarios/logico/:id
 * This doesn't remove data from database, just sets Estado to false
 * User can be reactivated later
 */
export const deleteLogico = async (id) => {
  const response = await fetch(`${API_BASE_URL}/usuarios/logico/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

/**
 * Reactivate a deactivated user
 * Endpoint: PUT /api/usuarios/reactivar/:id
 * Sets Estado back to true for an inactive user
 */
export const reactivarUsuario = async (id) => {
  const response = await fetch(`${API_BASE_URL}/usuarios/reactivar/${id}`, {
    method: "PUT",
  });
  return response.json();
};

/**
 * Physical delete - Permanently remove user from database (hard delete)
 * Endpoint: DELETE /api/usuarios/fisico/:id
 * WARNING: This action is permanent and cannot be undone
 * Use logical delete (deleteLogico) if you need to preserve data
 */
export const deleteFisico = async (id) => {
  const response = await fetch(`${API_BASE_URL}/usuarios/fisico/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
