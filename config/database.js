const { Sequelize } = require('sequelize');

// Determine if we're in production (Render) or development (local)
const isProduction = process.env.NODE_ENV === 'production' || process.env.PGHOST?.includes('render.com');

const sequelizeConfig = {
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: true,
    underscored: true
  }
};

// Add SSL configuration only for production/Render
if (isProduction) {
  sequelizeConfig.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  };
}

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  sequelizeConfig
);

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('✅ Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('❌ Unable to connect to the database:', err);
  });

module.exports = {
  sequelize,
  Sequelize
}; 