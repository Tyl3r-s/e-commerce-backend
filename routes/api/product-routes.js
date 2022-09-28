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

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  Product.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
    include: [
      {
        model: Tag,
        attributes: ['id', 'tag_name']
      }
    ]
  })
    // be sure to include its associated Category and Tag data
    .then(dbProductData => {
      if (!dbProductData) {
        res.status(404).json({ message: 'No product found with this id' })
        return;
      }
      res.json(dbProductData);
    })
    .catch(err => {
      console.log(err);
      res.json(500).json(err);
    })
});

// create new product
