'use strict';

const controller = require('../controller/productsController');

module.exports = (app) => {
    app.route('/products').get(controller.getAllProducts);
    app.route('/products/addToCart').post(controller.addProductToCart);
    app.route('/products/productsInCart').get(controller.getProductsInCart)
}
