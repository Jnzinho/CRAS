import { DataTypes } from "sequelize";
import sequelize from "../sequelize";

const Category = sequelize.define('Category', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codigo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'categorias',
});

export default Category;