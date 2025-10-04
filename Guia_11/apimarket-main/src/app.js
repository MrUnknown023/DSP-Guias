import express from 'express';
import marketRoutes from './routes/market.routes.js'

const app=express()

// Middleware para procesar JSON
app.use(express.json());

// Middleware para procesar datos de formularios (opcional, si usas x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

app.use(marketRoutes)

app.use((req, res, next) => {
  res.status(404).json({
    message: "Favor realizar pruebas en los siguientes endpoints:",
    endpoints: [
      "https://apimarket-production-10e5.up.railway.app/usuarios",
      "https://apimarket-production-10e5.up.railway.app/productos"
    ]
  });
});

export default app;
