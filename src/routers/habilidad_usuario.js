const express = require('express');
const { Router } = require("express");

const habilidadUsuarioController = require('../controllers/HabilidadUsuarioController'); 
const router = Router(); // Usar Router() en lugar de express.Router()

router.post('/crear_habilidad_usuario', habilidadUsuarioController.crear_habilidad_usuario);

module.exports = router;