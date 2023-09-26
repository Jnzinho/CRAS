import { DataTypes } from "sequelize";
import sequelize from "../sequelize";

const Video = sequelize.define('Video', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataType.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'videos',
});

export default Video;