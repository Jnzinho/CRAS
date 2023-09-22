import { DataTypes } from "sequelize";
import sequelize from "../sequelize";

const Teacher = sequelize.define('Teacher', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  hashedPassword: {
    type: DataTypes.STRING(64),
    allowNull: false,
    validate: {
      is: /^[0-9a-f]{64}$/i
    },
  },
}, {
  tableName: 'professores',
});

export default Teacher;