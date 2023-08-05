import { Sequelize } from 'sequelize';

// Replace the values below with your PostgreSQL credentials
const sequelize = new Sequelize('cras', 'jnzinho', 'admin', {
  host: 'localhost', // Default is 'localhost'
  dialect: 'postgres',
});

export default sequelize;
