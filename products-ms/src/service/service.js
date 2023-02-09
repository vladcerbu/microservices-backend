'use strict';
const repository = require('../repository/repository');

const service = {
    getAllProducts: async () => {
        return await repository.getAllProducts();
    },

    addProductToCart: async (productId) => {
        return await repository.addProductToCart(productId);
    },

    getProductsFromCart: async () => {
        const products = await repository.getAllProducts();
        const productsInCart = await repository.getProductsFromCart();
        return productsInCart.map((product) => {
            for(let i = 0; i < products.length; i++){
                if(products[i].productId === product.productId)
                    return {...product, title: products[i].title}
            }
            return product;
        })
    }
};

module.exports = service;
