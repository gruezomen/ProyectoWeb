const express = require('express');
const connectDB = require('./src/config/database');
const productRoutes = require('./src/routes/productRoutes');

const app = express();
const PORT = 3000;


connectDB();


app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    mensaje: '¡Servidor funcionando! 🚀',
    endpoints: {
      productos: '/api/products'
    }
  });
});


app.use('/api/products', productRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});