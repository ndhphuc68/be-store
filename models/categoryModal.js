module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("category", {
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    primaryCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    uploadId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  return Category;
};
