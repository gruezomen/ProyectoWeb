// seeders/seed.js - VERSIÓN COMPACTA
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Modelos
const Categoria = require('../src/models/Categoria');
const Subcategoria = require('../src/models/Subcategoria');
const NivelDificultad = require('../src/models/NivelDificultad');
const RangoEdad = require('../src/models/RangoEdad');
const Usuario = require('../src/models/usuario');
const Pregunta = require('../src/models/pregunta');

// Datos de prueba compactos
const DATA = {
  niveles: [
    { nivel: 'Fácil', descripcion: 'Preguntas básicas', activo: true },
    { nivel: 'Intermedio', descripcion: 'Dificultad media', activo: true },
    { nivel: 'Difícil', descripcion: 'Preguntas avanzadas', activo: true },
    { nivel: 'Experto', descripcion: 'Nivel experto', activo: true }
  ],
  
  rangos: [
    { nombre_rango: 'Niños (6-12)', edad_minima: 6, edad_maxima: 12, activo: true },
    { nombre_rango: 'Adolescentes (13-17)', edad_minima: 13, edad_maxima: 17, activo: true },
    { nombre_rango: 'Jóvenes (18-25)', edad_minima: 18, edad_maxima: 25, activo: true },
    { nombre_rango: 'Adultos (26-60)', edad_minima: 26, edad_maxima: 60, activo: true }
  ],
  
  usuarios: [
    { nombre: 'Carlos', apellido: 'Admin', email: 'admin@gestorpreguntas.com', password: 'Admin123!', rol: 'administrador' },
    { nombre: 'Ana', apellido: 'Editor', email: 'editor@gestorpreguntas.com', password: 'Editor123!', rol: 'editor' },
    { nombre: 'Luis', apellido: 'Gestor', email: 'gestor@gestorpreguntas.com', password: 'Gestor123!', rol: 'gestor' },
    { nombre: 'María', apellido: 'Usuario', email: 'estudiante@gestorpreguntas.com', password: 'Estudiante123!', rol: 'estudiante' }
  ],
  
  categorias: [
    { nombre: 'Matemáticas', descripcion: 'Álgebra, cálculo, geometría', activo: true },
    { nombre: 'Ciencias Naturales', descripcion: 'Física, química, biología', activo: true },
    { nombre: 'Ciencias Sociales', descripcion: 'Historia, geografía, economía', activo: true },
    { nombre: 'Lenguaje', descripcion: 'Gramática, literatura, ortografía', activo: true },
    { nombre: 'Tecnología', descripcion: 'Programación, informática', activo: true }
  ],
  
  subcategorias: [
    { nombre: 'Álgebra', descripcion: 'Ecuaciones y expresiones', cat: 0 },
    { nombre: 'Geometría', descripcion: 'Formas y medidas', cat: 0 },
    { nombre: 'Cálculo', descripcion: 'Derivadas e integrales', cat: 0 },
    { nombre: 'Física', descripcion: 'Mecánica y termodinámica', cat: 1 },
    { nombre: 'Química', descripcion: 'Compuestos y reacciones', cat: 1 },
    { nombre: 'Historia', descripcion: 'Historia universal', cat: 2 },
    { nombre: 'Geografía', descripcion: 'Países y capitales', cat: 2 }
  ]
};

async function seedDatabase() {
  try {
    console.log('🌱 Iniciando seed...');
    
    await require('../src/config/database')();
    console.log('✅ Conectado a MongoDB');

    // Limpiar
    await Promise.all([
      Categoria.deleteMany({}),
      Subcategoria.deleteMany({}),
      NivelDificultad.deleteMany({}),
      RangoEdad.deleteMany({}),
      Usuario.deleteMany({}),
      Pregunta.deleteMany({})
    ]);
    console.log('🧹 Colecciones limpiadas');

    // Crear datos
    const niveles = await NivelDificultad.create(DATA.niveles);
    const rangos = await RangoEdad.create(DATA.rangos);
    
    const salt = await bcrypt.genSalt(10);
    const usuarios = await Usuario.create(
      await Promise.all(DATA.usuarios.map(async u => ({
        ...u,
        password: await bcrypt.hash(u.password, salt),
        estado: 'habilitado',
        activo: true
      })))
    );
    
    const categorias = await Categoria.create(DATA.categorias);
    
    const subcategorias = await Subcategoria.create(
      DATA.subcategorias.map(s => ({
        nombre: s.nombre,
        descripcion: s.descripcion,
        categoria: categorias[s.cat]._id,
        activo: true
      }))
    );

    // Preguntas de ejemplo
    await Pregunta.create([
      {
        subcategoria: subcategorias[0]._id,
        rango_edad: rangos[2]._id,
        dificultad: niveles[0]._id,
        tipo_pregunta: 'opcion_multiple',
        titulo_pregunta: 'Resuelve: 2x + 5 = 13',
        explicacion: 'Restamos 5 y dividimos entre 2',
        puntos_recomendados: 5,
        tiempo_estimado: 60,
        opciones: [
          { texto_opcion: 'x = 3', es_correcta: false, orden: 1 },
          { texto_opcion: 'x = 4', es_correcta: true, orden: 2 },
          { texto_opcion: 'x = 5', es_correcta: false, orden: 3 }
        ],
        activa: true,
        estado: 'aprobada'
      },
      {
        subcategoria: subcategorias[3]._id,
        rango_edad: rangos[1]._id,
        dificultad: niveles[1]._id,
        tipo_pregunta: 'verdadero_falso',
        titulo_pregunta: 'La gravedad lunar es 1/6 de la terrestre',
        explicacion: 'La Luna tiene menor masa',
        puntos_recomendados: 3,
        tiempo_estimado: 30,
        opciones: [
          { texto_opcion: 'Verdadero', es_correcta: true, orden: 1 },
          { texto_opcion: 'Falso', es_correcta: false, orden: 2 }
        ],
        activa: true,
        estado: 'aprobada'
      }
    ]);

    // Resumen
    console.log('\n' + '═'.repeat(50));
    console.log('🎉 BASE DE DATOS POBLADA EXITOSAMENTE');
    console.log('═'.repeat(50));
    console.log(`✅ Niveles: ${niveles.length} | Rangos: ${rangos.length}`);
    console.log(`✅ Usuarios: ${usuarios.length} | Categorías: ${categorias.length}`);
    console.log(`✅ Subcategorías: ${subcategorias.length} | Preguntas: 2`);
    console.log('\n🔐 CREDENCIALES:');
    DATA.usuarios.forEach(u => {
      console.log(`   ${u.rol}: ${u.email} / ${u.password}`);
    });
    console.log('═'.repeat(50) + '\n');

  } catch (error) {
    console.error('❌ ERROR:', error.message);
    process.exit(1);
  }
}

if (require.main === module) seedDatabase();
module.exports = seedDatabase;
