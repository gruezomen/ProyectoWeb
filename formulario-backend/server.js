require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/database');

const categoriasRoutes = require('./src/routes/categorias');
const subcategoriasRoutes = require('./src/routes/subcategorias');
const nivelesRoutes = require('./src/routes/nivelesDificultad');
const rangosRoutes = require('./src/routes/rangosEdad');

const app = express();

// Conectar a MongoDB
connectDB();

// Middleware
app.use(express.json());

// Rutas API
app.use('/api/categorias', categoriasRoutes);
app.use('/api/subcategorias', subcategoriasRoutes);
app.use('/api/niveles-dificultad', nivelesRoutes);
app.use('/api/rangos-edad', rangosRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  console.log('!!! LA RUTA / HA SIDO ALCANZADA !!!');
  res.json({
    mensaje: '✅ Servidor funcionando! 🚀',
    database: 'MongoDB conectado',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});