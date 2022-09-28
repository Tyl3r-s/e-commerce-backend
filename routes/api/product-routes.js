const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// GET /api/products
router.get('/', (req, res) => {
  // find all products
  Product.findAll({
    // include associated Category and Tag data
    attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
    include: [
      {
          model: Category,
          attributes: ['id', 'category_name'],
      },
      {
        model: Tag,
        attributes: ['id', 'tag_name']
      }
    ]
  })
    .then(dbProductData => res.json(dbProductData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});
