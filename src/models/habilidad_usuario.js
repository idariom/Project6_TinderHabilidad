const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const HabilidadUsuario = sequelize.define('Habilidad_Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_habilidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
});

sequelize.sync()
  .then(() => {
    console.log('La tabla Habilidad Usuario ha sido sincronizada con la base de datos.');
  })
  .catch((error) => {
    console.error('Error al sincronizar la tabla Habilidad Usuario:', error);
});

module.exports = HabilidadUsuario;
