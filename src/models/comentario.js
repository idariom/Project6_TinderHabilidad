const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Comentario = sequelize.define('Comentario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Usuarios', // Nombre de la tabla referenciada (Usuarios)
      key: 'id' // Columna referenciada en la tabla (Usuarios)
    }
  },
  id_proveedor: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Usuarios', // Nombre de la tabla referenciada (Usuarios)
      key: 'id' // Columna referenciada en la tabla (Usuarios)
    }
  },
  calificacion: {
    type: DataTypes.INTEGER
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  fecha_comentario: {
    type: DataTypes.DATE
  }
}, {
  timestamps: false, // Deshabilitar campos createdAt y updatedAt
  tableName: 'Comentario' // Nombre de la tabla en la base de datos
});

sequelize.sync()
  .then(() => {
    console.log('La tabla Comentario ha sido sincronizada con la base de datos.');
  })
  .catch((error) => {
    console.error('Error al sincronizar la tabla Comentario:', error);
  });

module.exports = Comentario;
