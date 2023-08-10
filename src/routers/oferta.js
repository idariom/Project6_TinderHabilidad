const express = require('express');
const { Router } = require("express");

const ofertaController = require('../controllers/OfertaController'); 
const router = Router(); // Usar Router() en lugar de express.Router()

router.post('/crear_oferta', ofertaController.crear_oferta);

router.put('/actualizar_oferta/:id', ofertaController.actualizar_oferta);

router.delete('/eliminar_oferta/:id', ofertaController.eliminar_oferta);

router.get('/obtener_todas_las_ofertas', ofertaController.obtener_todas_las_ofertas);
router.get('/obtener_oferta_por_id/:id', ofertaController.obtener_oferta_por_id);
router.get('/filtrar_oferta_por_habilidad/:id_habilidad', ofertaController.filtrar_oferta_por_habilidad);
router.get('/filtrar_oferta_por_precio', ofertaController.filtrar_oferta_por_precio);
router.get('/filtrar_oferta_por_descripcion', ofertaController.filtrar_oferta_por_descripcion);

module.exports = router;