module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    uploadId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isSale: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    propety: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    isDelete:{
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    slug:{
      type: DataTypes.STRING,
      allowNull: true,
    }
  });

  return Product;
};
