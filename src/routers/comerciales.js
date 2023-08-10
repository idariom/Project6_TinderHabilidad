const express = require('express');
const { Router } = require("express");

const comercialController = require('../controllers/ComercialesController'); 
const router = Router(); // Usar Router() en lugar de express.Router()

router.get('/obtener_comerciales', comercialController.obtener_comerciales);
router.get('/obtener_comercial_por_id/:id', comercialController.obtener_comercial_por_id);
router.get('/obtener_comerciales_por_cliente_proveedor', comercialController.obtener_comerciales_por_cliente_proveedor);
router.get('/obtener_comerciales_por_fecha', comercialController.obtener_comerciales_por_fecha);

router.post('/crear_comercial', comercialController.crear_comercial);

router.put('/actualizar_comercial/:id', comercialController.actualizar_comercial);

router.delete('/eliminar_comercial/:id', comercialController.eliminar_comercial);

module.exports = router;