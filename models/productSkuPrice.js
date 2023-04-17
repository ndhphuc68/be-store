module.exports = (sequelize, DataTypes) => {
  const ProductSkuPrice = sequelize.define("productSkuPrice", {
    productCode: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
    },
    seq: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
    },
    salePrice: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  });

  return ProductSkuPrice;
};
