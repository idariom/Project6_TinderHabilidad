const express = require('express');
const { Router } = require("express");

const pedidosController = require('../controllers/PedidoController'); 
const router = Router(); // Usar Router() en lugar de express.Router()

router.get('/obtener_todos_los_pedidos', pedidosController.obtener_todos_los_pedidos);
router.get('/obtener_pedido_por_id/:id', pedidosController.obtener_pedido_por_id);
router.get('/obtener_pedido_por_estado/estado', pedidosController.obtener_pedido_por_estado);

router.post('/crear_pedido', pedidosController.crear_pedido);

router.put('/actualizar_pedido/:id', pedidosController.actualizar_pedido);
router.put('/actualizar_estado_pedido/:id/estado', pedidosController.actualizar_estado_pedido);

router.delete('/eliminar_pedido/:id', pedidosController.eliminar_pedido);


module.exports = router;