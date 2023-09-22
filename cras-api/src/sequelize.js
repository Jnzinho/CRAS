import { Sequelize } from 'sequelize';

// Replace the values below with your PostgreSQL credentials
const sequelize = new Sequelize('cras', 'jnzinho', 'admin', {
  host: 'localhost', // Default is 'localhost'
  dialect: 'postgres',
});

sequelize.sync({ force: true }).then(() => console.log('DB Synced')).catch((err) => console.error(err));

export default sequelize;
