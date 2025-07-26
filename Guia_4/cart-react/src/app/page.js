"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation"; // ✅ CORRECTO en App Router
import { getUser, logout, isAuthenticated } from "../utils/auth";
import { Headers } from "../components/Header";
import { ProductList } from "../components/ProductList";

export default function Home() {
  const [user, setUser] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);

  //Valida si hay una sesión activa y redirige si no la hay
  useEffect(() => {
    if (!isAuthenticated()) {
      redirect("/login"); // 🔁 Redirige directamente
    } else {
      setUser(getUser());
    }
  }, []);

  //Si no hay usuario autenticado, no renderiza nada
  if (!user) return null;

  return (
  <div className="container-fluid px-0">
    {/* Barra superior responsiva */}
    <div className="bg-light py-3 shadow-sm">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center">
          <div className="d-flex align-items-center mb-3 mb-md-0">
            <span className="fs-5 me-2">👋</span>
            <p className="mb-0 fs-5">
              Bienvenido, <span className="fw-bold text-primary">{user.username}</span>
            </p>
          </div>
          <div className="d-flex align-items-center mb-3 mb-md-0">
            <h3>Tu Libreria📚</h3>
          </div>
          <div className="d-flex">
            <button 
              className="btn btn-outline-danger d-flex align-items-center me-3"
              onClick={() => { logout(); redirect("/login"); }}
            >
              <i className="bi bi-box-arrow-right me-1"></i>
              <span className="d-none d-md-inline">Cerrar sesión</span>
            </button>
            
            <Headers
              allProducts={allProducts}
              setAllProducts={setAllProducts}
              total={total}
              setTotal={setTotal}
              countProducts={countProducts}
              setCountProducts={setCountProducts}
            />
          </div>
        </div>
      </div>
    </div>

    {/* Contenido principal responsivo */}
    <div className="container py-4">
      <ProductList
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        total={total}
        setTotal={setTotal}
        countProducts={countProducts}
        setCountProducts={setCountProducts}
      />
    </div>
  </div>
);
}

