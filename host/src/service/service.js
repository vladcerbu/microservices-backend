'use strict';
const axios = require("axios");
const {ORDER_MS_URL} = require("../config");
const {PRODUCTS_MS_URL} = require("../config");

const service = {
    getAllProducts: async () => {
        const products = [];
        await axios.get(`${PRODUCTS_MS_URL}/products`)
            .then((res) => products.push(...res.data));
        return products;
    },

    getProductsFromCart: async () => {
        const productsFromCart = []
        await axios.get(`${PRODUCTS_MS_URL}/products/productsInCart`)
            .then((res) => productsFromCart.push(...res.data));
        const numberOfProducts = productsFromCart.reduce((sum, product) => sum + product.number, 0);
        return {products: productsFromCart, numberOfProducts};
    },

    addProductToCart: async (productId) => {
        let status = 404;
        await axios.post(`${PRODUCTS_MS_URL}/products/addToCart`, {productId})
            .then((res) => status = res.status);
        return status;
    },

    order: async (formDetails) => {
        let status = 404;
        await axios.post(`${ORDER_MS_URL}/sendOrder`, { formDetails })
            .then((res) => status = res.status);
        return status;
    }
};

module.exports = service;
