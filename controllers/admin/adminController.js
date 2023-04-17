const ApiResponse = require("../dto/apiResponse");
const db = require("../models");

const Product = db.Product;
const ProductSkuPrice = db.ProductSkuPrice;
const ProductCategory = db.ProductCategory;

const createProduct = async (req, res) => {
  try {
    let data = req.body;
    let product = {
      productCode:
        Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000,
      productName: data.productName,
      productDescription: data.productDescription,
      uploadId: data.uploadId,
      isSale: data.isSale,
      unit: data.unit,
      propety: JSON.stringify(data.propety),
      slug: data.slug,
    };

    const newProduct = await Product.create(product);

    await ProductSkuPrice.create({
      productCode: product.productCode,
      seq: 1,
      salePrice: product.salePrice,
    });

    await ProductCategory.create({
      productCode: newProduct.productCode,
      categoryId: data.categoryId,
    });

    return res
      .status(200)
      .json(new ApiResponse(true));
  } catch (error) {
    return new ApiResponse(500, error);
  }
};
