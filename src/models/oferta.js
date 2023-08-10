const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Oferta = sequelize.define('Ofertas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_habilidades: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Habilidad', // Nombre de la tabla referenciada
          key: 'id' // Columna referenciada en la tabla
        }
      },
      descripcion: {
        type: DataTypes.TEXT
      },
      precio_hora: {
        type: DataTypes.DECIMAL(10, 2)
      }
    }, {
      timestamps: false, // Deshabilitar campos createdAt y updatedAt
      tableName: 'Ofertas' // Nombre de la tabla en la base de datos
});

sequelize.sync()
  .then(() => {
    console.log('La tabla oferta ha sido sincronizada con la base de datos.');
  })
  .catch((error) => {
    console.error('Error al sincronizar la tabla oferta:', error);
});

module.exports = Oferta;