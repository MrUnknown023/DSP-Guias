"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../utils/auth"; // Importa la función de autenticación para iniciar sesión
import Link from "next/link";

export default function Login() {
  const [username, setUsername] = useState(""); //Almacena el nombre de usuario ingresado
  const [password, setPassword] = useState(""); //Almacena la contraseña ingresada
  const [error, setError] = useState(""); //Almacena el mensaje de error
  const router = useRouter(); //Utilizado para la redireccion después del login

  const handleLogin = () => {
    //Busca los usuarios registrados en el localStorage bajo la key "users"
    let users = JSON.parse(localStorage.getItem("users")) || [];

    //Busca el usuario y contraseña ingresados
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      login(foundUser); //Activa la funcion de autenticacion para guardar el usuario en localStorage
      router.push("/"); //Redirecciona a la página principal
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm col-md-6 mx-auto">
        <h2 className="mb-4">Iniciar Sesión</h2>
        <div className="mb-3">
          <label className="form-label">Usuario</label>
          <input
            className="form-control"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            className="form-control"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>
          Ingresar
        </button>
        <div className="text-center">
          <Link href="/enroll">¿No tienes cuenta? <strong>Registrarse</strong></Link>
        </div>
      </div>
    </div>
  );
}