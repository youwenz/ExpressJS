const express = require('express');
const path = require('path');
const adminController = require('../controllers/admin');
const router = express.Router();


//displaying form for get request
router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts);

router.get('/edit-product/:productId', adminController.getEditProduct);
//app.get only fires for incoming get request
//app.get only triggers for incoming post request
router.post('/add-product', adminController.postAddProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

exports.routes = router;
