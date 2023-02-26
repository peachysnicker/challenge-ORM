const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

//Create ProductTag model
class ProductTag extends Model {}

//create fields/columns for ProductTag model
ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      refrences: {
        model: 'product',
        key: 'id',
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      refrences: {
        model: 'tag',
        key: 'id',
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

//export to allow for usage
module.exports = ProductTag;

