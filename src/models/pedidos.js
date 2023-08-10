const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { Usuario } = require('./usuario');

const Pedido = sequelize.define('Pedidos', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: 'id',
      },
    },
    id_proveedor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: 'id',
      },
    },
    fecha_pedido: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  }, {
    tableName: 'Pedidos',
  });
  
  // Definir relaciones entre modelos si es necesario
  Pedido.belongsTo(Usuario, { foreignKey: 'id_cliente', as: 'cliente' });
  Pedido.belongsTo(Usuario, { foreignKey: 'id_proveedor', as: 'proveedor' });
  
  sequelize.sync()
    .then(() => {
      console.log('La tabla Pedidos ha sido sincronizada con la base de datos.');
    })
    .catch((error) => {
      console.error('Error al sincronizar la tabla Pedidos:', error);
});

module.exports = Pedido;