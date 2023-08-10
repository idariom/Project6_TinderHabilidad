const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { Usuario } = require('./usuario');

const Comercial = sequelize.define('Comerciales', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario, // Utilizamos el modelo Usuario directamente
      key: 'id',
    },
  },
  id_proveedor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario, // Utilizamos el modelo Usuario directamente
      key: 'id',
    },
  },
  duracion_horas: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  precio_total: {
    type: DataTypes.NUMERIC(10, 2),
    allowNull: true,
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  estado: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
}, {
  // Opcional: Puedes especificar el nombre de la tabla en la base de datos
  tableName: 'Comerciales',
});

// Definir relaciones entre modelos si es necesario
Comercial.belongsTo(Usuario, { foreignKey: 'id_cliente', as: 'cliente' });
Comercial.belongsTo(Usuario, { foreignKey: 'id_proveedor', as: 'proveedor' });

sequelize.sync()
  .then(() => {
    console.log('La tabla Comerciales ha sido sincronizada con la base de datos.');
  })
  .catch((error) => {
    console.error('Error al sincronizar la tabla Comerciales:', error);
});

module.exports = Comercial
