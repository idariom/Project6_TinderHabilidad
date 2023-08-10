const { request, response } = require('express');
const { Usuario } = require('../models/usuario');
const bcrypt = require('bcrypt');

const registro_usuario = async (req = request, res = response) => {
  try {
    const data = req.body;
    console.log('req.body:', req.body); 
    const usuarioteExistente = await Usuario.findOne({ where: { email: data.email } });
    if (usuarioteExistente) {
      return res.status(409).send({ msg: 'El correo ya existe en la base de datos', data: undefined });
    }
    if (!data.password) {
      return res.status(400).send({ msg: 'No hay una contraseña', data: undefined });
    }
    // Crear un objeto con los campos requeridos
    const nuevoUsuario = {
      nombre: data.nombre,
      apellidos: data.apellidos,
      email: data.email,
      password: await bcrypt.hash(data.password, 10),
    };
    // Verificar si se proporciona un valor para telefonos, tipo y dni
    if (data.telefonos) {
      nuevoUsuario.telefonos = data.telefonos;
    }
    if (data.tipo) {
      nuevoUsuario.tipo = data.tipo;
    }
    if (data.dni) {
      nuevoUsuario.dni = data.dni;
    }

    // Guardar el registro
    await Usuario.create(nuevoUsuario);

    res.status(201).send({ data: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: 'Error en el servidor', data: undefined });
  }
};

const login_usuario = async (req = request, res = response) => {
    try {
      const data = req.body;
      // Verificar si el correo electrónico existe en la base de datos
      const usuario = await Usuario.findOne({ where: { email: data.email } });
  
      if (!usuario) {
        return res.status(404).send({ msg: 'El correo no está registrado', data: undefined });
      }
  
      // Verificar si la contraseña proporcionada coincide con la almacenada en la base de datos
      const esPasswordValido = await bcrypt.compare(data.password, usuario.password);
      if (!esPasswordValido) {
        return res.status(401).send({ msg: 'Contraseña incorrecta', data: undefined });
      }
  
      // Si el usuario y la contraseña son válidos, puedes generar un token de autenticación y enviarlo en la respuesta
      // Aquí puedes usar alguna biblioteca como jsonwebtoken para generar el token
  
      res.status(200).send({ msg: 'Inicio de sesión exitoso', data: usuario });
    } catch (error) {
      console.error('Error al intentar iniciar sesión:', error);
      res.status(500).send({ msg: 'Error en el servidor', data: undefined });
    }
  };

module.exports = {
  registro_usuario,
  login_usuario
};