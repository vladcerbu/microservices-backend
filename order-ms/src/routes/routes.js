'use strict';

const controller = require('../controller/orderController');

module.exports = (app) => {
    app.route('/sendOrder').post(controller.sendOrder);
}
