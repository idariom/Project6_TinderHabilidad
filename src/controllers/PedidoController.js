const { request, response } = require('express');
const Pedidos = require('../models/pedidos');

const crear_pedido = async (req, res) => {
    try {
        const nuevoPedido = req.body;
        const pedidoCreado = await Pedidos.create(nuevoPedido);
        res.status(201).json({ mensaje: 'Pedido creado exitosamente', pedido: pedidoCreado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear el pedido', error });
    }
};

const obtener_todos_los_pedidos = async (req, res) => {
    try {
        const pedidos = await Pedidos.findAll();
        res.status(200).json({ pedidos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los pedidos', error });
    }
};

const obtener_pedido_por_id = async (req, res) => {
    try {
        const pedidoId = req.params.id;
        const pedido = await Pedidos.findByPk(pedidoId);
        if (!pedido) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }
        res.status(200).json({ pedido });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener el pedido', error });
    }
};

const actualizar_estado_pedido = async (req, res) => {
    try {
        const pedidoId = req.params.id;
        const { estado } = req.body;

        const pedido = await Pedidos.findByPk(pedidoId);
        if (!pedido) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }

        await pedido.update({ estado });
        res.status(200).json({ mensaje: 'Estado de pedido actualizado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar el estado del pedido', error });
    }
};

const actualizar_pedido = async (req, res) => {
    try {
        const pedidoId = req.params.id;
        const nuevaInformacion = req.body;

        const pedido = await Pedidos.findByPk(pedidoId);
        if (!pedido) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }

        await pedido.update(nuevaInformacion);
        res.status(200).json({ mensaje: 'Información de pedido actualizada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar la información del pedido', error });
    }
};

const eliminar_pedido = async (req, res) => {
    try {
        const pedidoId = req.params.id;

        const pedido = await Pedidos.findByPk(pedidoId);
        if (!pedido) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }

        await pedido.destroy();
        res.status(200).json({ mensaje: 'Pedido eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar el pedido', error });
    }
};

const obtener_pedido_por_estado = async (req, res) => {
    try {
        const estado = req.query.estado;

        const pedidos = await Pedidos.findAll({
            where: { estado },
        });

        res.status(200).json({ pedidos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los pedidos por estado', error });
    }
};

module.exports = {
    crear_pedido,
    obtener_todos_los_pedidos,
    obtener_pedido_por_id,
    actualizar_estado_pedido,
    actualizar_pedido,
    eliminar_pedido,
    obtener_pedido_por_estado
};