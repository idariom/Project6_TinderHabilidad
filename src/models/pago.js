const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Pago = sequelize.define('Pagos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_comercial: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Comerciales', // Nombre de la tabla referenciada
            key: 'id' // Columna referenciada en la tabla
        }
    },
    monto: {
        type: DataTypes.DECIMAL(10, 2)
    },
    fecha_pago: {
        type: DataTypes.DATEONLY
    }
}, {
    timestamps: false, // Deshabilitar campos createdAt y updatedAt
    tableName: 'Pagos' // Nombre de la tabla en la base de datos
});

sequelize.sync()
    .then(() => {
        console.log('La tabla Pagos ha sido sincronizada con la base de datos.');
    })
    .catch((error) => {
        console.error('Error al sincronizar la tabla Pagos:', error);
    });

module.exports = Pago;
