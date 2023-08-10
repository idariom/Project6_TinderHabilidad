const express = require('express');
const router = express.Router();
const comentarioController = require('../controllers/ComentarioController');

router.post('/crear_comentario', comentarioController.crear_comentario);
router.get('/obtener_comentarios_por_proveedor/:id_proveedor', comentarioController.obtener_comentarios_por_proveedor);
router.get('/obtener_comentarios_por_cliente/:id_cliente', comentarioController.obtener_comentarios_por_cliente);
router.put('/actualizar_comentario/:id', comentarioController.actualizar_comentario);
router.delete('/eliminar_comentario/:id', comentarioController.eliminar_comentario);
router.get('/obtener_promedio_calificacion_por_proveedor/:id_proveedor', comentarioController.obtener_promedio_calificacion_por_proveedor);
router.get('/obtener_promedio_calificacion_por_cliente/:id_cliente', comentarioController.obtener_promedio_calificacion_por_cliente);
router.get('/obtener_comentarios_por_calificacion/:calificacion', comentarioController.obtener_comentarios_por_calificacion);
router.get('/obtener_comentarios_por_rango_de_fechas', comentarioController.obtener_comentarios_por_rango_de_fechas);
router.get('/obtener_ultimos_comentarios', comentarioController.obtener_ultimos_comentarios);

module.exports = router;
