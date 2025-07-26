"use client";
import { useState } from "react";

export const Headers = ({
  allProducts,
  setAllProducts,
  total,
  countProducts,
  setCountProducts,
  setTotal,
}) => {
  const [active, setActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showClearCartModal, setShowClearCartModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false); // NUEVO

  const onDeleteProduct = (product) => {
    const results = allProducts.filter((item) => item.id !== product.id);
    setTotal(total - product.price * product.quantity);
    setCountProducts(countProducts - product.quantity);
    setAllProducts(results);
  };

  const onCleanCart = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
  };

  return (
    <>
      <div className="position-relative">
        <button
          className="btn btn-outline-primary position-relative p-2"
          onClick={() => setActive(!active)}
          aria-label="Ver carrito"
        >
          <i className="bi bi-cart3 fs-4">🛒</i>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {countProducts}
          </span>
        </button>

        {/* Panel del carrito */}
        <div
          className={`position-absolute end-0 mt-2 ${active ? "" : "d-none"}`}
          style={{ width: "min(350px, 90vw)", zIndex: 1000 }}
        >
          <div className="card border-0 shadow-lg">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Tu Carrito</h5>
              <button
                className="btn btn-sm btn-light"
                onClick={() => setShowClearCartModal(true)}
              >
                Vaciar Todo
              </button>
            </div>

            <div className="card-body p-0">
              {allProducts.length ? (
                <>
                  <div
                    className="list-group list-group-flush"
                    style={{ maxHeight: "300px", overflowY: "auto" }}
                  >
                    {allProducts.map((product) => (
                      <div className="list-group-item" key={product.id}>
                        <div className="d-flex justify-content-between align-items-center">
                          <img
                            src={product.urlImage}
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                              borderRadius: "5px",
                            }}
                            className="me-3"
                          />
                          <div className="d-flex align-items-center">
                            <span className="badge bg-primary me-2">
                              {product.quantity}
                            </span>
                            <div>
                              <p className="mb-0 fw-bold">{product.title}</p>
                              <small className="text-muted">
                                ${product.price} c/u
                              </small>
                            </div>
                          </div>
                          <div className="d-flex align-items-center">
                            <span className="text-primary fw-bold me-2">
                              ${(product.price * product.quantity).toFixed(2)}
                            </span>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => {
                                setProductToDelete(product);
                                setShowModal(true);
                              }}
                              aria-label="Eliminar producto"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 border-top">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="mb-0">Total:</h5>
                      <span className="fs-4 fw-bold text-primary">${total}</span>
                    </div>
                    <button
                      className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                      onClick={() => setShowPurchaseModal(true)} // NUEVO
                    >
                      <i className="bi bi-credit-card me-2"></i> Comprar Ahora
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center p-4">
                  <i className="bi bi-cart-x text-muted fs-1 mb-2"></i>
                  <p className="mb-0">Tu carrito está vacío</p>
                  <small className="text-muted">Agrega algunos productos</small>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal para eliminar producto */}
      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">¿Estás seguro?</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    ¿Quieres eliminar <strong>{productToDelete?.title}</strong> del
                    carrito?
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      onDeleteProduct(productToDelete);
                      setShowModal(false);
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {/* Modal para confirmar "Vaciar Todo" */}
      {showClearCartModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">¿Vaciar carrito?</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowClearCartModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>¿Estás seguro de que quieres eliminar todos los productos del carrito?</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowClearCartModal(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      onCleanCart();
                      setShowClearCartModal(false);
                    }}
                  >
                    Vaciar Todo
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {/* NUEVO: Modal de resumen de compra */}
      {showPurchaseModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Resumen de tu compra</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowPurchaseModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <ul className="list-group">
                    {allProducts.map((product) => (
                      <li className="list-group-item" key={product.id}>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <strong>{product.title}</strong> ({product.quantity} x ${product.price})
                          </div>
                          <div>
                            ${(product.price * product.quantity).toFixed(2)}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <hr />
                  <div className="text-end">
                    <h5>Total: ${total.toFixed(2)}</h5>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowPurchaseModal(false)}>
                    Cancelar
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      alert("¡Gracias por tu compra!");
                      onCleanCart();
                      setShowPurchaseModal(false);
                      setActive(false); // Oculta el carrito
                    }}
                  >
                    Confirmar Compra
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </>
  );
};