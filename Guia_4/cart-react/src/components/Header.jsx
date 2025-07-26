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
        className={`position-absolute end-0 mt-2 ${active ? '' : 'd-none'}`}
        style={{width: 'min(350px, 90vw)', zIndex: 1000}}
      >
        <div className="card border-0 shadow-lg">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Tu Carrito</h5>
            <button 
              className="btn btn-sm btn-light"
              onClick={onCleanCart}
            >
              Vaciar Todo
            </button>
          </div>
          
          <div className="card-body p-0">
            {allProducts.length ? (
              <>
                <div className="list-group list-group-flush" style={{maxHeight: '300px', overflowY: 'auto'}}>
                  {allProducts.map((product) => (
                    <div className="list-group-item" key={product.id}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <span className="badge bg-primary me-2">{product.quantity}</span>
                          <div>
                            <p className="mb-0 fw-bold">{product.title}</p>
                            <small className="text-muted">${product.price} c/u</small>
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="text-primary fw-bold me-2">
                            ${(product.price * product.quantity).toFixed(2)}
                          </span>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => onDeleteProduct(product)}
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
                    onClick={() => alert('¡Gracias por tu compra!')}
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
  );
};
