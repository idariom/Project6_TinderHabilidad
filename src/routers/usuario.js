const express = require('express');
const { Router } = require("express");

const usuarioController = require('../controllers/UsuarioController'); 
const router = Router(); // Usar Router() en lugar de express.Router()

router.post('/registro_usuario', usuarioController.registro_usuario);
router.post(('/login_usuario'), usuarioController.login_usuario);

module.exports = router;
