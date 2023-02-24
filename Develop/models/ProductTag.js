const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

//Create ProductTag model
class ProductTag extends Model {}

//create fields/columns for ProductTag model
ProductTag.init(
  {
    id: {
      type: dataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: datatypes.INTEGER,
      refrences: {
        model: 'product',
        key: 'id',
      }
    },
    tag_id: {
      type: dataTypes.INTEGER,
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

