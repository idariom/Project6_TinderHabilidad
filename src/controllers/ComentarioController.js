const Comentario = require('../models/comentario');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const crear_comentario = async (req, res) => {
    try {
      // Obtener los datos necesarios del cuerpo de la solicitud
      const { id_cliente, id_proveedor, calificacion, descripcion } = req.body;
  
      // Crear el comentario en la base de datos
      const nuevoComentario = await Comentario.create({
        id_cliente,
        id_proveedor,
        calificacion,
        descripcion,
        fecha_comentario: new Date() // Establecer la fecha actual como fecha de comentario
      });
  
      return res.status(201).json({
        success: true,
        message: 'Comentario creado exitosamente',
        data: nuevoComentario
      });
    } catch (error) {
      console.error('Error al crear el comentario:', error);
      return res.status(500).json({
        success: false,
        message: 'Ha ocurrido un error al crear el comentario'
      });
    }
};

const obtener_comentarios_por_proveedor = async (req, res) => {
    try {
      // Obtener el ID del proveedor de los parámetros de la solicitud
      const { id_proveedor } = req.params;
  
      // Obtener todos los comentarios relacionados con el proveedor específico
      const comentarios = await Comentario.findAll({
        where: { id_proveedor }
      });
  
      return res.status(200).json({
        success: true,
        data: comentarios
      });
    } catch (error) {
      console.error('Error al obtener los comentarios por proveedor:', error);
      return res.status(500).json({
        success: false,
        message: 'Ha ocurrido un error al obtener los comentarios por proveedor'
      });
    }
};

const obtener_comentarios_por_cliente = async (req, res) => {
    try {
      // Obtener el ID del cliente de los parámetros de la solicitud
      const { id_cliente } = req.params;
  
      // Obtener todos los comentarios realizados por el cliente específico
      const comentarios = await Comentario.findAll({
        where: { id_cliente }
      });
  
      return res.status(200).json({
        success: true,
        data: comentarios
      });
    } catch (error) {
      console.error('Error al obtener los comentarios por cliente:', error);
      return res.status(500).json({
        success: false,
        message: 'Ha ocurrido un error al obtener los comentarios por cliente'
      });
    }
};
  
const actualizar_comentario = async (req, res) => {
    try {
      // Obtener el ID del comentario y el nuevo contenido del cuerpo de la solicitud
      const { id } = req.params;
      const { descripcion } = req.body;
  
      // Buscar el comentario por su ID
      const comentario = await Comentario.findByPk(id);
  
      if (!comentario) {
        return res.status(404).json({
          success: false,
          message: 'Comentario no encontrado'
        });
      }
  
      // Actualizar el contenido del comentario
      comentario.descripcion = descripcion;
      await comentario.save();
  
      return res.status(200).json({
        success: true,
        message: 'Comentario actualizado exitosamente'
      });
    } catch (error) {
      console.error('Error al actualizar el comentario:', error);
      return res.status(500).json({
        success: false,
        message: 'Ha ocurrido un error al actualizar el comentario'
      });
    }
};

const eliminar_comentario = async (req, res) => {
    try {
      // Obtener el ID del comentario
      const { id } = req.params;
  
      // Buscar el comentario por su ID
      const comentario = await Comentario.findByPk(id);
  
      if (!comentario) {
        return res.status(404).json({
          success: false,
          message: 'Comentario no encontrado'
        });
      }
  
      // Eliminar el comentario
      await comentario.destroy();
  
      return res.status(200).json({
        success: true,
        message: 'Comentario eliminado exitosamente'
      });
    } catch (error) {
      console.error('Error al eliminar el comentario:', error);
      return res.status(500).json({
        success: false,
        message: 'Ha ocurrido un error al eliminar el comentario'
      });
    }
};
  
const obtener_promedio_calificacion_por_proveedor = async (req, res) => {
    try {
      // Obtener el ID del proveedor
      const { id_proveedor } = req.params;
  
      // Calcular el promedio de calificación
      const promedioCalificacion = await Comentario.findOne({
        attributes: [[Sequelize.fn('AVG', Sequelize.col('calificacion')), 'promedio_calificacion']],
        where: { id_proveedor }
      });
  
      if (!promedioCalificacion || !promedioCalificacion.dataValues.promedio_calificacion) {
        return res.status(404).json({
          success: false,
          message: 'Proveedor no encontrado o sin calificaciones'
        });
      }
  
      return res.status(200).json({
        success: true,
        promedio_calificacion: parseFloat(promedioCalificacion.dataValues.promedio_calificacion)
      });
    } catch (error) {
      console.error('Error al obtener el promedio de calificación:', error);
      return res.status(500).json({
        success: false,
        message: 'Ha ocurrido un error al obtener el promedio de calificación'
      });
    }
};
  
const obtener_promedio_calificacion_por_cliente = async (req, res) => {
    try {
      // Obtener el ID del cliente
      const { id_cliente } = req.params;
  
      // Calcular el promedio de calificación
      const promedioCalificacion = await Comentario.findOne({
        attributes: [[Sequelize.fn('AVG', Sequelize.col('calificacion')), 'promedio_calificacion']],
        where: { id_cliente }
      });
  
      if (!promedioCalificacion || !promedioCalificacion.dataValues.promedio_calificacion) {
        return res.status(404).json({
          success: false,
          message: 'Cliente no encontrado o sin calificaciones'
        });
      }
  
      return res.status(200).json({
        success: true,
        promedio_calificacion: parseFloat(promedioCalificacion.dataValues.promedio_calificacion)
      });
    } catch (error) {
      console.error('Error al obtener el promedio de calificación:', error);
      return res.status(500).json({
        success: false,
        message: 'Ha ocurrido un error al obtener el promedio de calificación'
      });
    }
};
  
const obtener_comentarios_por_calificacion = async (req, res) => {
    try {
      // Obtener la calificación específica de los parámetros de la URL
      const { calificacion } = req.params;
  
      // Obtener los comentarios con la calificación específica
      const comentarios = await Comentario.findAll({
        where: { calificacion }
      });
  
      if (!comentarios || comentarios.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No se encontraron comentarios con la calificación especificada'
        });
      }
  
      return res.status(200).json({
        success: true,
        comentarios
      });
    } catch (error) {
      console.error('Error al obtener comentarios por calificación:', error);
      return res.status(500).json({
        success: false,
        message: 'Ha ocurrido un error al obtener comentarios por calificación'
      });
    }
};

const obtener_comentarios_por_rango_de_fechas = async (req, res) => {
    try {
      // Obtener las fechas de inicio y fin del rango de fechas de los parámetros de la URL
      const { fecha_inicio, fecha_fin } = req.query;
  
      // Convertir las fechas a objetos Date
      const fechaInicio = new Date(fecha_inicio);
      const fechaFin = new Date(fecha_fin);
  
      // Obtener los comentarios en el rango de fechas especificado
      const comentarios = await Comentario.findAll({
        where: {
          fecha_comentario: {
            [Op.between]: [fechaInicio, fechaFin]
          }
        }
      });
  
      if (!comentarios || comentarios.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No se encontraron comentarios en el rango de fechas especificado'
        });
      }
  
      return res.status(200).json({
        success: true,
        comentarios
      });
    } catch (error) {
      console.error('Error al obtener comentarios por rango de fechas:', error);
      return res.status(500).json({
        success: false,
        message: 'Ha ocurrido un error al obtener comentarios por rango de fechas'
      });
    }
};
  
const obtener_ultimos_comentarios = async (req, res) => {
    try {
      // Obtener la cantidad de comentarios a obtener (opcional, puedes ajustarla según tu necesidad)
      const { cantidad } = req.query;
      const cantidadComentarios = parseInt(cantidad) || 10; // Valor predeterminado: 10 comentarios
  
      // Obtener los últimos comentarios en orden cronológico
      const comentarios = await Comentario.findAll({
        order: [['fecha_comentario', 'DESC']],
        limit: cantidadComentarios
      });
  
      if (!comentarios || comentarios.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No se encontraron comentarios recientes'
        });
      }
  
      return res.status(200).json({
        success: true,
        comentarios
      });
    } catch (error) {
      console.error('Error al obtener últimos comentarios:', error);
      return res.status(500).json({
        success: false,
        message: 'Ha ocurrido un error al obtener últimos comentarios'
      });
    }
};
  

module.exports = {
    crear_comentario,
    obtener_comentarios_por_proveedor,
    obtener_comentarios_por_cliente,
    actualizar_comentario,
    eliminar_comentario,
    obtener_promedio_calificacion_por_proveedor,
    obtener_promedio_calificacion_por_cliente,
    obtener_comentarios_por_calificacion,
    obtener_comentarios_por_rango_de_fechas,
    obtener_ultimos_comentarios
};