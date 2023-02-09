'use strict';

const service = require('../service/service');

const productsController = {
    getAllProducts: async (req, res) => {
         const products = await service.getAllProducts();
         res.json(products);
    },

    addProductToCart: async (req, res) => {
        const { productId } = req.body;
        await service.addProductToCart(productId);
        res.status(200);
        res.json();
    },

    getProductsInCart: async (req, res) => {
        const products = await service.getProductsFromCart();
        res.json(products);
    }
};

module.exports = productsController;
