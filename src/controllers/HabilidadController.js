const { request, response } = require('express');
const { Habilidad } = require('../models/habilidad');

// Obtener todas las habilidades
const obtener_habilidades = async (req = request, res = response) => {
    try {
      const habilidades = await Habilidad.findAll();
      res.status(200).send({ data: habilidades });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: 'Error en el servidor', data: undefined });
    }
};

// Obtener una habilidad por su ID
const obtener_habilidadPor_Id = async (req = request, res = response) => {
    try {
      const { id } = req.params;
      const habilidad = await Habilidad.findByPk(id);
      if (!habilidad) {
        return res.status(404).send({ msg: 'Habilidad no encontrada', data: undefined });
      }
      res.status(200).send({ data: habilidad });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: 'Error en el servidor', data: undefined });
    }
};

// Crear una nueva habilidad
const crear_habilidad = async (req = request, res = response) => {
    console.log('que esta pasando');
    try {
      const data = req.body;
      console.log('que esta pasando2');
      const nuevaHabilidad = await Habilidad.create(data);
      console.log('que esta pasando3');
      res.status(201).send({ data: nuevaHabilidad });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: 'Error en el servidor', data: undefined });
    }
};

// Actualizar una habilidad
const actualizar_habilidad = async (req = request, res = response) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const habilidad = await Habilidad.findByPk(id);
      if (!habilidad) {
        return res.status(404).send({ msg: 'Habilidad no encontrada', data: undefined });
      }
      await habilidad.update(data);
      res.status(200).send({ msg: 'Habilidad actualizada correctamente', data: habilidad });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: 'Error en el servidor', data: undefined });
    }
};

// Eliminar una habilidad
const eliminar_habilidad = async (req = request, res = response) => {
    try {
      const { id } = req.params;
      const habilidad = await Habilidad.findByPk(id);
      if (!habilidad) {
        return res.status(404).send({ msg: 'Habilidad no encontrada', data: undefined });
      }
      await habilidad.destroy();
      res.status(200).send({ msg: 'Habilidad eliminada correctamente', data: habilidad });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: 'Error en el servidor', data: undefined });
    }
};

module.exports = {
    obtener_habilidades,
    obtener_habilidadPor_Id,
    crear_habilidad,
    actualizar_habilidad,
    eliminar_habilidad,
};