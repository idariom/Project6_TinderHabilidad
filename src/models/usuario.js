const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Usuario = sequelize.define('Usuario', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      apellidos: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      telefonos: {
        type: DataTypes.STRING(20),
      },
      tipo: {
        type: DataTypes.STRING(20),
      },
      dni: {
        type: DataTypes.STRING(20),
      },
    }, {
      // Opcional: Puedes especificar el nombre de la tabla en la base de datos
      tableName: 'Usuarios',

});

sequelize.sync()
  .then(() => {
    console.log('La tabla Usuarios ha sido sincronizada con la base de datos.');
  })
  .catch((error) => {
    console.error('Error al sincronizar la tabla Usuarios:', error);
});

module.exports = {
    Usuario
}