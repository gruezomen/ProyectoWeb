

require('dotenv').config();
const express = require('express');
const spdy = require('spdy');
const http = require('http');
const fs = require('fs');
const connectDB = require('./src/config/database');

const categoriasRoutes = require('./src/routes/categorias');
const subcategoriasRoutes = require('./src/routes/subcategorias');
const nivelesRoutes = require('./src/routes/nivelesDificultad');
const rangosRoutes = require('./src/routes/rangosEdad');
const preguntasRoutes = require('./src/routes/preguntas');
const authRoutes = require('./src/routes/auth');
const adminRoutes = require('./src/routes/admin');

const app = express();

// Conectar a MongoDB
connectDB();

// Middleware
app.use(express.json());

// Rutas API
app.use('/api/admin', adminRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/subcategorias', subcategoriasRoutes);
app.use('/api/niveles-dificultad', nivelesRoutes);
app.use('/api/rangos-edad', rangosRoutes);
app.use('/api/preguntas', preguntasRoutes);
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  const protocol = req.isSpdy ? 'H2' : (req.secure ? 'HTTPS' : 'HTTP');
  const port = req.socket.localPort;
  
  console.log(`✅ Ruta / accedida via ${protocol} en puerto ${port}`);
  
  res.json({
    mensaje: `✅ Servidor funcionando con ${protocol}! 🚀`,
    database: 'MongoDB conectado',
    protocolo: protocol,
    puerto: port,
    urls: {
      actual: `${protocol.toLowerCase()}://localhost:${port}`,
      http: 'http://localhost:5000',
      https: 'https://localhost:5001'
    }
  });
});

// Configuración de certificados SSL para HTTPS
const options = {
  key: fs.readFileSync('./cert/key.pem'),
  cert: fs.readFileSync('./cert/cert.pem')
};

const HTTP_PORT = 5000;
const HTTPS_PORT = 5001;

// Servidor HTTP en puerto 5000
http.createServer(app).listen(HTTP_PORT, () => {
  console.log(`🌐 Servidor HTTP escuchando en http://localhost:${HTTP_PORT}`);
});

// Servidor SPDY (HTTPS/H2) en puerto 5001
spdy.createServer(options, app).listen(HTTPS_PORT, (error) => {
    if (error) {
        console.error('Error al iniciar servidor SPDY:', error);
        return process.exit(1);
    }
    console.log(`🔒 Servidor SPDY (HTTPS/H2) escuchando en https://localhost:${HTTPS_PORT}`);
});

console.log('\n🚀 Servidores iniciados correctamente');
console.log('📝 Endpoints disponibles:');
console.log('   - HTTP:  http://localhost:5000');
console.log('   - HTTPS/H2: https://localhost:5001');
console.log('\n💡 Presiona Ctrl+C para detener los servidores\n');
