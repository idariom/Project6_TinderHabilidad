const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres', // Especifica aquí el dialecto de tu base de datos (por ejemplo, 'postgres' para PostgreSQL)
  username: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
  
sequelize.authenticate()
  .then(() => {
    console.log('Conectado a la base de datos');
  })
  .catch((err) => {
    console.error('Error al conectarse en la base de datos', err);
    process.exit(1);
  });

module.exports = {
  sequelize
};
