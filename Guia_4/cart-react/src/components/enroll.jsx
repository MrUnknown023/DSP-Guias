"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Enroll() {
  const [username, setUsername] = useState(""); //Almacena el nombre de usuario ingresado
  const [password, setPassword] = useState(""); //Almacena la contraseña ingresada
  const router = useRouter(); // Utilizado para la redireccion después del registro
  const [error, setError] = useState(""); //Almacena el mensaje de error

  const handleRegister = () => {
    if (!username.trim() || !password.trim()) { // Verificar si los campos están vacíos
      setError("Debes completar ambos campos.");
      return;
    }

    //Busca al usuario en el localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find(u => u.username === username); //Verifica si el usuario ya se encuentra registrado
    if (exists) {
      setError("Este usuario ya está registrado.");
      return;
    }

    //En caso de que no exista, se registra al usuario
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users)); //Lo guarda en el localStorage bajo la key users
    setError(""); //Limpia el mensaje de error
    router.push("/login"); // Redirige a la página de inicio de sesión
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm col-md-6 mx-auto">
        <h2 className="mb-4">Registro de Usuario</h2>
        <div className="mb-3">
          <label className="form-label">Usuario</label>
          <input
            className="form-control"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)} //Se actualiza el estado del usuario, es decir el "useState" de usuario al detectar un cambio en el input
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            className="form-control"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)} //Se actualiza el estado del usuario, es decir el "useState" de password al detectar un cambio en el input
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button className="btn btn-success w-100 mb-3" onClick={handleRegister}>
          Registrarse
        </button>
        <div className="text-center">
          <Link href="/login">¿Ya tienes cuenta? <strong>Iniciar sesión</strong></Link>
        </div>
      </div>
    </div>
  );
}
