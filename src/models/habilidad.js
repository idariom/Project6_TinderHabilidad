const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');


const Habilidad = sequelize.define('Habilidad', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_habilidad: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tarifa_hora: {
      type: DataTypes.NUMERIC(10, 2),
      allowNull: false,
    },
  }, {
    // Opcional: Puedes especificar el nombre de la tabla en la base de datos
    tableName: 'Habilidad',
});

sequelize.sync()
  .then(() => {
    console.log('La tabla Habilidad ha sido sincronizada con la base de datos.');
  })
  .catch((error) => {
    console.error('Error al sincronizar la tabla Habilidad:', error);
});

module.exports = {
    Habilidad
}