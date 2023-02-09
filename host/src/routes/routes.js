'use strict';

const controller = require('../controller/controller');

module.exports = (app) => {
    app.route('/api/getAllProducts').get(controller.getAllProducts);
    app.route('/api/getProductsInCart').get(controller.getProductsInCart);
    app.route('/api/addProductToCart').post(controller.addProductToCart);
    app.route('/api/sendOrder').post(controller.sendOrder);
}
