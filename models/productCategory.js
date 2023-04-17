module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define("productCategory", {
    productCode: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
    },
  });

  return ProductCategory;
};
