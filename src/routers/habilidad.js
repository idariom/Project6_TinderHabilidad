const express = require('express');
const { Router } = require("express");

const habilidadController = require('../controllers/HabilidadController'); 
const router = Router(); // Usar Router() en lugar de express.Router()

router.get('/obtener_habilidades', habilidadController.obtener_habilidades);
router.get('/obtener_habilidadPor_Id/:id', habilidadController.obtener_habilidadPor_Id);
router.post('/crear_habilidad', habilidadController.crear_habilidad);
router.put('/actualizar_habilidad/:id', habilidadController.actualizar_habilidad);
router.delete('/eliminar_habilidad/:id', habilidadController.eliminar_habilidad);

module.exports = router;