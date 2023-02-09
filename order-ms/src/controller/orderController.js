'use strict';

const service = require('../service/service');

const orderController = {
    sendOrder: async (req, res) => {
        const { formDetails } = req.body;
        const response = await service.order(formDetails);
        res.status(response);
        res.json();
    },
};

module.exports = orderController;
