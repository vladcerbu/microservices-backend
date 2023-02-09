'use strict';

const service = require('../service/service');

const controller = {
    getAllProducts: async (req, res) => {
        const products = await service.getAllProducts();
        res.status(200);
        res.json(products);
    },

    getProductsInCart: async (req, res) => {
        const productsFromCart = await service.getProductsFromCart();
        res.status(200);
        res.json(productsFromCart);
    },

    addProductToCart: async (req, res) => {
        const { productId } = req.body;
        const status = await service.addProductToCart(productId);
        res.status(status);
        res.json();
    },

    sendOrder: async (req, res) => {
        const { formDetails } = req.body;
        const response = await service.order(formDetails);
        res.status(response);
        res.json();
    },
};

module.exports = controller;
