import { DataTypes } from 'sequelize';
import sequelize from '../sequelize';

const Class = sequelize.define(
  'Class',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'turmas',
  }
);

export default Class;
