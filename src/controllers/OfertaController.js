const { request, response } = require('express');
const { Op } = require('sequelize');
const Oferta = require('../models/oferta');
const { Habilidad } = require('../models/habilidad');

const crear_oferta = async (req, res) => {
    try {
      const { id_habilidades, descripcion, precio_hora } = req.body;
  
      // Crear la oferta en la base de datos
      const nuevaOferta = await Oferta.create({
        id_habilidades,
        descripcion,
        precio_hora
      });
  
      return res.status(201).json({
        success: true,
        message: 'Oferta creada exitosamente',
        oferta: nuevaOferta
      });
    } catch (error) {
      console.error('Error al crear la oferta:', error);
      return res.status(500).json({
        success: false,
        message: 'Ha ocurrido un error al crear la oferta'
      });
    }
};

const actualizar_oferta = async (req, res) => {
    try {
      const ofertaId = req.params.id;
      const { descripcion, precio_hora } = req.body;
  
      // Buscar la oferta en la base de datos
      const oferta = await Oferta.findByPk(ofertaId);
  
      if (!oferta) {
        return res.status(404).json({
          success: false,
          message: 'Oferta no encontrada'
        });
      }
  
      // Actualizar la oferta
      oferta.descripcion = descripcion;
      oferta.precio_hora = precio_hora;
      await oferta.save();
  
      return res.status(200).json({
        success: true,
        message: 'Oferta actualizada exitosamente',
        oferta
      });
    } catch (error) {
      console.error('Error al actualizar la oferta:', error);
      return res.status(500).json({
        success: false,
        message: 'Ha ocurrido un error al actualizar la oferta'
      });
    }
};

const eliminar_oferta = async (req, res) => {
    try {
      const ofertaId = req.params.id;
  
      // Buscar la oferta en la base de datos
      const oferta = await Oferta.findByPk(ofertaId);
  
      if (!oferta) {
        return res.status(404).json({
          success: false,
          message: 'Oferta no encontrada'
        });
      }
  
      // Eliminar la oferta
      await oferta.destroy();
  
      return res.status(200).json({
        success: true,
        message: 'Oferta eliminada exitosamente'
      });
    } catch (error) {
      console.error('Error al eliminar la oferta:', error);
      return res.status(500).json({
        success: false,
        message: 'Ha ocurrido un error al eliminar la oferta'
      });
    }
};

const obtener_todas_las_ofertas = async (req, res) => {
    try {
      // Obtener todas las ofertas de la base de datos
      const ofertas = await Oferta.findAll();
  
      return res.status(200).json({
        success: true,
        data: ofertas
      });
    } catch (error) {
      console.error('Error al obtener las ofertas:', error);
      return res.status(500).json({
        success: false,
        message: 'Ha ocurrido un error al obtener las ofertas'
      });
    }
};

const obtener_oferta_por_id = async (req, res) => {
    const ofertaId = req.params.id;
  
    try {
      // Buscar la oferta por su ID en la base de datos
      const oferta = await Oferta.findByPk(ofertaId);
  
      if (!oferta) {
        return res.status(404).json({
          success: false,
          message: 'Oferta no encontrada'
        });
      }
  
      return res.status(200).json({
        success: true,
        data: oferta
      });
    } catch (error) {
      console.error('Error al obtener la oferta:', error);
      return res.status(500).json({
        success: false,
        message: 'Ha ocurrido un error al obtener la oferta'
      });
    }
};

const filtrar_oferta_por_habilidad = async (req, res) => {
    const habilidadId = req.params.id_habilidad;
  
    try {
      // Buscar la habilidad por su ID en la base de datos
      const habilidad = await Habilidad.findByPk(habilidadId);
  
      if (!habilidad) {
        return res.status(404).json({
          success: false,
          message: 'Habilidad no encontrada'
        });
      }
  
      // Filtrar las ofertas por la habilidad seleccionada
      const ofertas = await Oferta.findAll({
        where: {
          id_habilidades: habilidadId
        }
      });
  
      return res.status(200).json({
        success: true,
        data: ofertas
      });
    } catch (error) {
      console.error('Error al filtrar las ofertas por habilidad:', error);
      return res.status(500).json({
        success: false,
        message: 'Ha ocurrido un error al filtrar las ofertas por habilidad'
      });
    }
};

const filtrar_oferta_por_precio = async (req, res) => {
    const precioMin = parseFloat(req.query.min);
    const precioMax = parseFloat(req.query.max);
  
    if (isNaN(precioMin) || isNaN(precioMax)) {
      return res.status(400).json({
        success: false,
        message: 'Los valores de precio deben ser numéricos'
      });
    }
  
    try {
      // Filtrar las ofertas por rango de precio
      const ofertas = await Oferta.findAll({
        where: {
          precio_hora: {
            [Op.between]: [precioMin, precioMax]
          }
        }
      });
  
      return res.status(200).json({
        success: true,
        data: ofertas
      });
    } catch (error) {
      console.error('Error al filtrar las ofertas por precio:', error);
      return res.status(500).json({
        success: false,
        message: 'Ha ocurrido un error al filtrar las ofertas por precio'
      });
    }
  };

const filtrar_oferta_por_descripcion = async (req, res) => {
    const descripcion = req.query.descripcion;
  
    if (!descripcion) {
      return res.status(400).json({
        success: false,
        message: 'La descripción no puede estar vacía'
      });
    }
  
    try {
      // Filtrar las ofertas por descripción
      const ofertas = await Oferta.findAll({
        where: {
          descripcion: {
            [Op.iLike]: `%${descripcion}%`
          }
        }
      });
  
      return res.status(200).json({
        success: true,
        data: ofertas
      });
    } catch (error) {
      console.error('Error al filtrar las ofertas por descripción:', error);
      return res.status(500).json({
        success: false,
        message: 'Ha ocurrido un error al filtrar las ofertas por descripción'
      });
    }
};

module.exports = {
    crear_oferta,
    actualizar_oferta,
    eliminar_oferta,
    obtener_todas_las_ofertas,
    obtener_oferta_por_id,
    filtrar_oferta_por_habilidad,
    filtrar_oferta_por_precio,
    filtrar_oferta_por_descripcion
};