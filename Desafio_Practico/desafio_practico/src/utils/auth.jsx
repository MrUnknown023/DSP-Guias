//Guarda la data del usuario autenticado en el localStorage bajo la key "session"
export const login = (userData) => {
  localStorage.setItem("session", JSON.stringify(userData));
};

//Busca la session del usuario en el localStorage y la elimina
export const logout = () => {
  localStorage.removeItem("session");
};

//Busca la sesion del usuario autenticado en el localStorage y retorna su información
export const getUser = () => {
  const userSession = localStorage.getItem("session");
  return userSession ? JSON.parse(userSession) : null;
};

//Verifica si hay una session activa en el localStorage
export const isAuthenticated = () => {
  return !!localStorage.getItem("session");
};