const { request, response } = require('express');
const { Op } = require('sequelize');
// const { Comerciales } = require('../models/comerciales');
const Comerciales = require('../models/comerciales');

const obtener_comerciales = async (req, res) => {
    try {
      const comerciales = await Comerciales.findAll();
      res.status(200).json({ data: comerciales });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error en el servidor', data: undefined });
    }
};

const obtener_comercial_por_id = async (req, res) => {
    try {
      const { id } = req.params;
      const comercial = await Comerciales.findByPk(id);
      if (!comercial) {
        return res.status(404).json({ msg: 'Comercial no encontrado', data: undefined });
      }
      res.status(200).json({ data: comercial });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error en el servidor', data: undefined });
    }
};

const crear_comercial = async (req = request, res = response) => {
    try {
      const data = req.body;
      const nuevoComercial = await Comerciales.create( data );
      res.status(201).json({ data: nuevoComercial });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error en el servidor', data: undefined });
    }
};

const actualizar_comercial = async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const comercial = await Comerciales.findByPk(id);
      if (!comercial) {
        return res.status(404).json({ msg: 'Comercial no encontrado', data: undefined });
      }
      await comercial.update(data);
      res.status(200).json({ msg: 'Comercial actualizado correctamente', data: comercial });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error en el servidor', data: undefined });
    }
};

const eliminar_comercial = async (req, res) => {
    try {
      const { id } = req.params;
      const comercial = await Comerciales.findByPk(id);
      if (!comercial) {
        return res.status(404).json({ msg: 'Comercial no encontrado', data: undefined });
      }
      await comercial.destroy();
      res.status(200).json({ msg: 'Comercial eliminado correctamente', data: comercial });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error en el servidor', data: undefined });
    }
};

// Obtener comerciales por cliente o proveedor
const obtener_comerciales_por_cliente_proveedor = async (req, res) => {
    try {
        const id_cliente = parseInt(req.query.id_cliente);
        const id_proveedor = parseInt(req.query.id_proveedor);
        
        const comerciales = await Comerciales.findAll({
            where: {
                [Op.or]: [
                    { id_cliente },
                    { id_proveedor },
                ],
            },
        });

        res.status(200).send({ data: comerciales });
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: 'Error en el servidor', data: undefined });
    }
};

const obtener_comerciales_por_fecha = async (req, res) => {
    try {
        const { fecha_inicio, fecha_fin } = req.query;

        const comerciales = await Comerciales.findAll({
            where: {
                [Op.and]: [
                    {
                        fecha_inicio: {
                            [Op.gte]: new Date(fecha_inicio),
                        },
                    },
                    {
                        fecha_fin: {
                            [Op.lte]: new Date(fecha_fin),
                        },
                    },
                ],
            },
        });

        res.status(200).send({ data: comerciales });
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: 'Error en el servidor', data: undefined });
    }
};


module.exports = {
    obtener_comerciales,
    obtener_comercial_por_id,
    crear_comercial,
    actualizar_comercial,
    eliminar_comercial,
    obtener_comerciales_por_cliente_proveedor,
    obtener_comerciales_por_fecha,
}
  
  
  
  
  