const express = require('express');
const router = express.Router();

// Rutas disponibles
// const userRoutes = require('./userRoutes');
// const inventarioRoutes = require('./inventarioRoutes');

// router.use('/users', userRoutes);
// router.use('/inventario', inventarioRoutes);

router.get('/', (req, res) => {
  res.send('📡 API funcionando correctamente');
});

module.exports = router;
