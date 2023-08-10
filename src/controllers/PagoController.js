const { request, response } = require('express');
const Pago = require('../models/pago');

const crear_pago = async (req, res) => {
    const { id_comercial, monto, fecha_pago } = req.body;

    try {
        const nuevoPago = await Pago.create({
            id_comercial,
            monto,
            fecha_pago
        });

        return res.status(201).json({
            success: true,
            data: nuevoPago
        });
    } catch (error) {
        console.error('Error al crear el pago:', error);
        return res.status(500).json({
            success: false,
            message: 'Ha ocurrido un error al crear el pago'
        });
    }
};

const obtener_pagos_por_comercial = async (req, res) => {
    const id_comercial = req.params.id_comercial;

    try {
        const pagos = await Pago.findAll({
            where: {
                id_comercial
            }
        });

        return res.status(200).json({
            success: true,
            data: pagos
        });
    } catch (error) {
        console.error('Error al obtener los pagos por comercial:', error);
        return res.status(500).json({
            success: false,
            message: 'Ha ocurrido un error al obtener los pagos por comercial'
        });
    }
};

const actualizar_pago = async (req, res) => {
    const id = req.params.id;
    const { id_comercial, monto, fecha_pago } = req.body;

    try {
        const pagoActualizado = await Pago.update(
            {
                id_comercial,
                monto,
                fecha_pago
            },
            {
                where: {
                    id
                }
            }
        );

        return res.status(200).json({
            success: true,
            data: pagoActualizado
        });
    } catch (error) {
        console.error('Error al actualizar el pago:', error);
        return res.status(500).json({
            success: false,
            message: 'Ha ocurrido un error al actualizar el pago'
        });
    }
};

module.exports = {
    crear_pago,
    obtener_pagos_por_comercial,
    actualizar_pago
};