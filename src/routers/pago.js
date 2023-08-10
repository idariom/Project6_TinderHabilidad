const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/PagoController');

router.post('/crear_pago', pagoController.crear_pago);
router.get('/obtener_pagos_por_comercial/:id_comercial', pagoController.obtener_pagos_por_comercial);
router.put('/actualizar_pago/:id', pagoController.actualizar_pago);

module.exports = router;