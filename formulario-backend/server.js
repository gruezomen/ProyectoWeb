require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/database');

const app = express();


// Conectar a MongoDB
connectDB();

// Middleware
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    mensaje: '✅ Servidor funcionando! 🚀',
    database: 'MongoDB conectado',
    
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});