import React from "react";
//import { data } from "../app/data";
import { useEffect, useState } from "react";

export const ProductList = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {
  const [products, setProducts] = useState([]);

  // Traer productos desde la API
  useEffect(() => {
    fetch("https://68842d9a745306380a37b565.mockapi.io/api/v1/dps/libros") // ← reemplaza por tu URL real
      .then((res) => res.json())
      .then((data) => {
        // Añadimos la propiedad quantity por defecto
        const productsWithQuantity = data.map((item) => ({
          ...item,
          quantity: 1,
        }));
        setProducts(productsWithQuantity);
      });
  }, []);

  // Agregar al carrito
  const onAddProduct = (product) => {
    if (allProducts.find((item) => item.id === product.id)) {
      const products = allProducts.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setTotal(total + product.price * product.quantity);
      setCountProducts(countProducts + product.quantity);
      return setAllProducts([...products]);
    }
    setTotal(total + product.price * product.quantity);
    setCountProducts(countProducts + product.quantity);
    setAllProducts([...allProducts, product]);
  };

  // Renderizar productos
  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.map((product) => (
          <div className="col" key={product.id}>
            <div className="card h-100 shadow-sm border-0">
              <div className="position-relative">
                <img
                  src={product.urlImage}
                  alt={product.nameProduct}
                  className="card-img-top"
                  style={{ width: "100%", height: "auto", objectFit: "contain" }}
                />
                <div className="position-absolute top-0 end-0 bg-primary text-white px-2 py-1 rounded-bl">
                  ${product.price}
                </div>
              </div>

              <div className="card-body d-flex flex-column">
                <h2 className="card-title h5 mb-3">{product.nameProduct}</h2>

                <button
                  className="btn btn-outline-primary mt-auto"
                  onClick={() => onAddProduct(product)}
                >
                  <i className="bi bi-cart-plus me-2"></i>Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

};
