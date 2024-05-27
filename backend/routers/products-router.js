const express = require('express');
const router = express.Router();

const products = require('../controllers/products-controller.js');

router.route('/').get(products.getProducts).post(products.setProduct);
router
  .route('/:id')
  .get(products.getSingleProduct)
  .patch(products.updateProduct)
  .delete(products.deleteProduct);

module.exports = router;
